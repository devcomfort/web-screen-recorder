import type { EnhancedMediaRecorderOptions, MediaType } from "schemas";
import { getDefaultMimeType, getMimeType } from "../getters";
import { isString } from "lodash";
import { assert } from "@toss/assert";

/**
 * 향상된 미디어 레코더 생성
 * @param mediaStream 미디어 스트림
 * @param options 옵션 (미디어 타입, 코덱, 컨테이너 등)
 * @returns 미디어 레코더 인스턴스와 메소드
 */
export function createMediaRecorder(
	mediaStream: MediaStream,
	options?: EnhancedMediaRecorderOptions,
) {
	// 미디어 타입 결정 (기본값: 비디오)
	const mediaType: MediaType = options?.mediaType || "video";

	// 자동으로 적절한 MIME 타입 선택
	let mimeType: string | null = null;

	// 코덱과 컨테이너가 명시적으로 지정된 경우
	if (options?.codec && options?.container) {
		mimeType = getMimeType(mediaType, options.codec, options.container);
	}

	// 지정되지 않았거나 지원되지 않는 경우 기본값 사용
	if (!mimeType) {
		mimeType = getDefaultMimeType(mediaType);
		if (!mimeType) {
			throw new Error(
				`현재 브라우저에서 ${mediaType} 녹화를 지원하지 않습니다.`,
			);
		}
	}

	// 설정 객체에서 mediaType, codec, container 속성 제거
	const {
		mediaType: _,
		codec: __,
		container: ___,
		...recorderOptions
	} = options || {};

	// 녹화된 데이터 청크 저장 배열
	let recordedChunks: Blob[] = [];
	let _fps = 60;
	let _isRecording = false;

	// MediaRecorder 인스턴스 생성
	const mediaRecorder = new MediaRecorder(mediaStream, {
		...recorderOptions,
		mimeType,
	});

	// 데이터 이벤트 핸들러
	mediaRecorder.ondataavailable = (event) => {
		if (event.data.size > 0) {
			recordedChunks = [...recordedChunks, event.data];
		}
	};

	function wrapper() {
		/**
		 * 녹화 시작
		 * @param fps 초당 프레임 수 (비디오 녹화에만 적용)
		 */
		function startRecord(fps = 60) {
			if (_isRecording) return wrapper();

			_fps = fps;
			_isRecording = true;

			// 오디오의 경우 타임 슬라이스 설정을 다르게 함
			if (mediaType === "audio") {
				mediaRecorder.start(100); // 오디오는 100ms 간격으로 데이터 수집
			} else {
				mediaRecorder.start(1000 / fps); // 비디오는 fps에 따라 간격 설정
			}

			return wrapper();
		}

		/**
		 * 녹화 중지
		 */
		function stopRecord() {
			if (!_isRecording) return wrapper();

			return new Promise<ReturnType<typeof wrapper>>((resolve) => {
				mediaRecorder.onstop = () => {
					_isRecording = false;
					resolve(wrapper());
				};

				mediaRecorder.stop();
			});
		}

		/**
		 * 녹화 일시정지
		 */
		function pauseRecord() {
			if (_isRecording && mediaRecorder.state === "recording") {
				mediaRecorder.pause();
			}
			return wrapper();
		}

		/**
		 * 일시정지된 녹화 재개
		 */
		function resumeRecord() {
			if (_isRecording && mediaRecorder.state === "paused") {
				mediaRecorder.resume();
			}
			return wrapper();
		}

		/**
		 * 저장된 청크 비우기
		 */
		function flushChunks() {
			recordedChunks = [];
			return wrapper();
		}

		/**
		 * 청크를 하나의 Blob으로 조합
		 */
		function assembleChunks(): Blob {
			// TODO: 내용 추가하기
			assert(isString(mimeType), "");

			return new Blob(recordedChunks, {
				type: mimeType,
			});
		}

		/**
		 * 파일 저장하기
		 * @param filename 저장할 파일 이름
		 */
		function saveFile(filename?: string): void {
			if (recordedChunks.length === 0) {
				console.warn("저장할 녹화 데이터가 없습니다.");
				return;
			}

			const blob = assembleChunks();
			const url = URL.createObjectURL(blob);

			assert(isString(mimeType), "");

			let filename_: string;

			// 파일 이름 생성
			if (!filename) {
				const date = new Date().toISOString().replace(/[:.]/g, "-");
				const extension = mimeType.split("/")[1].split(";")[0];
				filename_ = `recording-${date}.${extension}`;
			} else {
				filename_ = filename;
			}

			// 다운로드 링크 생성 및 클릭
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = filename_;
			document.body.appendChild(a);
			a.click();

			// 자원 정리
			setTimeout(() => {
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}, 100);
		}

		/**
		 * 미디어 스트림 종료
		 */
		function stopStream(): void {
			for (const track of mediaStream.getTracks()) {
				track.stop();
			}
		}

		/**
		 * 현재 설정된 fps 반환
		 */
		function getFps(): number {
			return _fps;
		}

		/**
		 * 현재 녹화 상태 확인
		 */
		function isRecording(): boolean {
			return _isRecording;
		}

		/**
		 * 현재 사용 중인 MIME 타입 반환
		 *
		 * 드물게 MIME 타입이 정의되지 않은 경우 `null` 반환.
		 */
		function getCurrentMimeType(): string | null {
			return mimeType;
		}

		/**
		 * 녹화 데이터 URL 생성
		 */
		function createObjectUrl(): string {
			if (recordedChunks.length === 0) {
				throw new Error("녹화 데이터가 없습니다.");
			}
			return URL.createObjectURL(assembleChunks());
		}

		return {
			// 기본 메소드
			getMediaRecorder: () => mediaRecorder,
			startRecord,
			stopRecord,
			pauseRecord,
			resumeRecord,
			flushChunks,
			assembleChunks,

			// 추가 기능
			saveFile,
			stopStream,
			getFps,
			isRecording,
			getCurrentMimeType,
			createObjectUrl,

			// 메타데이터
			mediaType,
			mimeType: mimeType,
		};
	}

	return wrapper();
}
