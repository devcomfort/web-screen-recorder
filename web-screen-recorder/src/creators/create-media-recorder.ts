import type { EnhancedMediaRecorderOptions, MediaType } from "schemas";
import { match, Pattern } from "ts-pattern";

import path from "node:path";

import { DateTime } from "luxon";
import mime from "mime";

import { isString } from "fp-ts/string";
import * as F from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

import { getDefaultMimeType, getMimeType } from "../getters";
import JsFileDownloader from "js-file-downloader";

/**
 * 고급 미디어 녹화 기능을 제공하는 미디어 레코더 클래스
 *
 * 주요 기능:
 * - 안전한 MIME 타입 처리
 * - 유연한 미디어 녹화 (오디오/비디오)
 * - 작업 기반 오류 처리
 * - 지능형 파일 이름 생성
 *
 * @class
 * @note 브라우저 컨텍스트 내에서 싱글톤으로 사용하도록 설계됨
 */
class MediaRecorder_ {
	// 구성 설정값
	private mimeType: string; // MIME 타입 저장
	private mediaType: string; // 미디어 타입 (오디오/비디오)
	private fps: number; // 초당 프레임 수 (기본값: 60, 정수여야 함)

	// 녹화 관련 변수
	private recordedChunks: Blob[]; // 녹화된 미디어 청크 배열
	private isRecording: boolean; // 현재 녹화 상태
	private mediaRecorder: MediaRecorder; // 네이티브 MediaRecorder 인스턴스

	/**
	 * 미디어 레코더 인스턴스 생성
	 *
	 * @constructor
	 * @param {MediaStream} mediaStream - 녹화할 미디어 스트림
	 * @param {EnhancedMediaRecorderOptions} [options] - 녹화 설정 옵션
	 * @param {string} [options.mediaType='video'] - 녹화할 미디어 유형 (비디오/오디오)
	 * @param {string} [options.codec] - 선택적 코덱 지정
	 * @param {string} [options.container] - 선택적 컨테이너 형식
	 * @param {number} [options.fps=60] - 비디오 녹화를 위한 초당 프레임 수
	 *
	 * @throws {Error} 지원되지 않는 MIME 타입인 경우 예외 발생
	 */
	constructor(
		mediaStream: MediaStream,
		options?: EnhancedMediaRecorderOptions,
	) {
		// 기본값 설정 및 옵션 병합
		const { mediaType = "video", codec, container, fps = 60 } = options ?? {};

		// 기능적 프로그래밍 기법을 사용한 MIME 타입 안전 처리
		const mimeTypeResult = this.getMimeTypeSafely(mediaType, codec, container);

		// MIME 타입 오류 처리
		if (E.isLeft(mimeTypeResult)) {
			throw mimeTypeResult.left;
		}

		const mimeType = mimeTypeResult.right;

		// 구성 정보 저장
		this.mediaType = mediaType;
		this.mimeType = mimeType;

		// 녹화 상태 초기화
		this.recordedChunks = [];
		this.isRecording = false;
		this.fps = fps;

		// 네이티브 MediaRecorder 구성
		const mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType,
			...(options ?? {}),
		});

		// 데이터 관리를 위한 이벤트 핸들러
		mediaRecorder.ondataavailable = (event) => {
			// 데이터 청크가 있는 경우에만 추가
			const hasData = event.data.size > 0;
			if (!hasData) return;
			this.recordedChunks = [...this.recordedChunks, event.data];
		};

		mediaRecorder.onstart = () => {
			// 녹화 시작 시 상태 업데이트
			this.isRecording = true;
		};

		mediaRecorder.onstop = () => {
			// 녹화 중지 시 상태 업데이트
			this.isRecording = false;
		};

		this.mediaRecorder = mediaRecorder;
	}

	/**
	 * 미디어 타입, 코덱, 컨테이너를 기반으로 안전하게 MIME 타입 결정
	 *
	 * @private
	 * @param {MediaType} mediaType - 미디어 유형 (비디오/오디오)
	 * @param {string} [codec] - 선택적 코덱 지정
	 * @param {string} [container] - 선택적 컨테이너 형식
	 * @returns {E.Either<Error, string>} 유효한 MIME 타입 또는 오류
	 */
	private getMimeTypeSafely(
		mediaType: MediaType,
		codec?: string,
		container?: string,
	): E.Either<Error, string> {
		// 코덱과 컨테이너가 명시적으로 제공된 경우
		if (codec && container) {
			const mimeType = getMimeType(mediaType, codec, container);
			return mimeType
				? E.right(mimeType)
				: E.left(new Error("지원되지 않는 MIME 타입입니다."));
		}

		// 기본 MIME 타입 찾기
		const defaultMimeType = getDefaultMimeType(mediaType);
		return defaultMimeType
			? E.right(defaultMimeType)
			: E.left(
					new Error(`${mediaType} 형식에 대한 지원되는 MIME 타입이 없습니다.`),
				);
	}

	/**
	 * 모든 녹화된 청크 초기화
	 *
	 * @private
	 */
	private flushChunks() {
		this.recordedChunks = new Array();
	}

	/**
	 * 녹화된 청크들을 단일 Blob으로 조합
	 *
	 * @private
	 * @returns {E.Either<Error, Blob>} 녹화된 미디어의 Blob 또는 오류
	 */
	private assembleChunks(): E.Either<Error, Blob> {
		// MIME 타입 유효성 검사
		if (!isString(this.mimeType))
			return E.left(
				new Error(
					`지원되지 않는 MIME 타입입니다 (MIME 타입: ${this.mimeType})`,
				),
			);

		// 청크들을 단일 Blob으로 결합
		return E.right(
			new Blob(this.recordedChunks, {
				type: this.mimeType,
			}),
		);
	}

	/**
	 * 녹화된 청크가 없는지 확인
	 *
	 * @private
	 * @returns {boolean} 청크가 없으면 true, 있으면 false
	 */
	private isChunkListEmpted(): boolean {
		return this.recordedChunks.length === 0;
	}

	/**
	 * 녹화된 미디어를 지능형 파일 이름으로 저장
	 *
	 * @async
	 * @param {string} [filename_] - 선택적 사용자 지정 파일 이름
	 * @returns {Promise<E.Either<Error, void>>} 파일 다운로드 작업 결과
	 */
	async saveFile(filename_?: string): Promise<E.Either<Error, void>> {
		// 녹화된 데이터 유효성 검사
		if (this.isChunkListEmpted())
			return E.left(new Error("저장할 녹화 데이터가 없습니다"));
		if (!isString(this.mimeType))
			return E.left(
				new Error(
					`지원되지 않는 MIME 타입입니다 (MIME 타입: ${this.mimeType})`,
				),
			);

		// 파일 확장자 결정
		const extname = match({
			fromMimeType: mime.getExtension(this.mimeType),
			fromFilename: isString(filename_) ? path.extname(filename_) : null,
		})
			.with(
				{ fromFilename: Pattern.string.minLength(2) },
				({ fromFilename }) => fromFilename,
			)
			.with(
				{ fromMimeType: Pattern.string },
				({ fromMimeType }) => fromMimeType,
			)
			.otherwise(() => null);

		// 파일 이름 결정
		const filename = match(filename_)
			.with(Pattern.string, (filename) =>
				path.basename(filename, extname ?? undefined),
			)
			.otherwise(() => DateTime.now().toFormat("yyyy-MM-dd-HH-mm-ss"));

		// 확장자가 포함된 전체 파일 이름 생성
		const basename = `${filename}.${extname}`;

		// 녹화된 청크를 Blob으로 조합
		const blob = this.assembleChunks();
		const url = F.pipe(
			blob,
			E.fold(
				() => null,
				(blob) => URL.createObjectURL(blob),
			),
		);

		// URL 생성 유효성 검사
		if (url === null)
			return E.left(new Error("비디오 데이터 청크 병합에 실패했습니다"));

		// 파일 다운로드 수행
		return new JsFileDownloader({ url, filename: basename })
			.then(() => {
				URL.revokeObjectURL(url);
				return E.right(undefined);
			})
			.catch((err) => E.left(new Error(`다운로드 실패 (사유: ${err})`)));
	}

	/**
	 * 미디어 녹화 시작
	 *
	 * @async
	 * @returns {Promise<TE.TaskEither<Error, void>>} 녹화 시작 결과
	 */
	async start(): Promise<TE.TaskEither<Error, void>> {
		// 이미 녹화 중인 경우 오류 반환
		if (!this.isRecording)
			return TE.left(new Error("이미 녹화가 활성화되어 있습니다"));

		// 청크 내 데이터 초기화
		this.flushChunks();

		// 미디어 타입에 따른 녹화 시작
		return match({
			mediaType: this.mediaType,
		})
			.with({ mediaType: "audio" }, () =>
				TE.tryCatch(
					async () => this.mediaRecorder.start(100),
					(reason) => new Error(`음성 녹음 시작 실패 (사유: ${reason})`),
				),
			)
			.with({ mediaType: "video" }, () =>
				TE.tryCatch(
					async () => this.mediaRecorder.start(1_000 / this.fps),
					(reason) => new Error(`비디오 녹화 시작 실패 (사유: ${reason})`),
				),
			)
			.otherwise(({ mediaType }) =>
				TE.left(
					new Error(`잘못된 미디어 타입 사용 (미디어 타입: ${mediaType})`),
				),
			);
	}

	/**
	 * 미디어 녹화 중지
	 *
	 * @async
	 * @returns {Promise<TE.TaskEither<Error, void>>} 녹화 중지 결과
	 */
	async stop(): Promise<TE.TaskEither<Error, void>> {
		// 이미 중지된 경우 오류 반환
		if (this.isRecording)
			return TE.left(new Error("이미 녹화가 중지되었습니다"));

		// 녹화 중지 시도
		return TE.tryCatch(
			async () => {
				this.mediaRecorder.stop();
			},
			(reason) => new Error(`녹화/녹음 중지 실패 (사유: ${reason})`),
		);
	}

	/**
	 * 현재 녹화 일시 정지
	 *
	 * @async
	 * @returns {Promise<E.Either<Error, void>>} 일시 정지 작업 결과
	 */
	async pause(): Promise<E.Either<Error, void>> {
		// 이미 녹화 중이 아닌 경우 오류 반환
		if (!this.isRecording)
			return E.left(new Error("이미 일시 정지된 상태입니다"));
		this.mediaRecorder.pause();

		return E.right(undefined);
	}

	/**
	 * 일시 정지된 녹화 재개
	 *
	 * @async
	 * @returns {Promise<E.Either<Error, void>>} 재개 작업 결과
	 */
	async resume(): Promise<E.Either<Error, void>> {
		// 이미 녹화 중인 경우 오류 반환
		if (this.isRecording) return E.left(new Error("이미 재생 중입니다"));
		this.mediaRecorder.resume();

		return E.right(undefined);
	}
}

export { MediaRecorder_ as MediaRecorder };
