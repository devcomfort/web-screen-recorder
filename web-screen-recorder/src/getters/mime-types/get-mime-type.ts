import { match, Pattern } from "ts-pattern";

import type { MediaType } from "schemas";
import { isMimeTypeSupported } from "validators";
import { SUPPORTED_FORMATS } from "vars";

/**
 * 주어진 미디어 세부 정보에 일치하는 MIME 타입을 찾아 반환합니다.
 *
 * @description
 * - (사전 정의된 타입 목록을 기준으로) 미디어 유형, 코덱, 컨테이너 형식을 기반으로 정확한 MIME 타입을 검색합니다.
 * - 일치하는 형식을 찾으면 해당 MIME 타입의 브라우저 지원 여부를 확인합니다.
 * - 지원되는 형식이 없거나 브라우저에서 지원하지 않으면 `null`을 반환합니다.
 *
 * @param mediaType - 미디어 유형 (`"video"` 또는 `"audio"`)
 * @param codec - 미디어 코덱 (예: `"h264"`, `"vp9"`, `"aac"`)
 * @param container - 미디어 컨테이너 형식 (예: `"mp4"`, `"webm"`, `"mp3"`)
 * @returns 지원되는 MIME 타입 또는 일치하는 형식이 없을 경우 `null`
 *
 * @example
 * // 비디오 MP4 형식의 MIME 타입 찾기
 * const mimeType = getMimeType('video', 'h264', 'mp4');
 * // 예: 'video/mp4'
 *
 * @example
 * // 오디오 WebM 형식의 MIME 타입 찾기
 * const audioMimeType = getMimeType('audio', 'opus', 'webm');
 * // 예: 'audio/webm'
 */
export function getMimeType(
	mediaType: MediaType,
	codec: string,
	container: string,
): string | null {
	const { mimeType } =
		SUPPORTED_FORMATS.find(
			(f) =>
				f.mediaType === mediaType &&
				f.codec === codec &&
				f.container === container,
		) ?? {};

	const isSupported = isMimeTypeSupported(mimeType);

	return match({
		mimeType,
		isSupported,
	})
		.with(
			{
				mimeType: Pattern.string,
				isSupported: true,
			},
			({ mimeType }) => mimeType,
		)
		.otherwise(() => null);
}
