import type { MediaType } from "schemas";
import { getSupportedFormats } from "./get-supported-formats";

/**
 * 주어진 미디어 유형에 대해 현재 브라우저에서 지원되는 기본 MIME 타입을 찾습니다.
 *
 * @description
 * - 특정 미디어 유형(`mediaType`)에 대해 브라우저 지원 형식을 확인합니다.
 * - 지원되는 형식이 있으면 첫 번째 지원 형식의 MIME 타입을 반환합니다.
 * - 지원되는 형식이 없으면 `null`을 반환합니다.
 *
 * @param mediaType - 기본 MIME 타입을 찾을 미디어 유형 (`"video"` 또는 `"audio"`)
 * @returns 지원되는 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
 *
 * @example
 * // 비디오의 기본 지원 MIME 타입 찾기
 * const defaultVideoType = getDefaultMimeType('video');
 * // 예: 'video/mp4'
 *
 * @example
 * // 오디오의 기본 지원 MIME 타입 찾기
 * const defaultAudioType = getDefaultMimeType('audio');
 * // 예: 'audio/mpeg'
 */
export function getDefaultMimeType(mediaType: MediaType): string | null {
	// 현재 브라우저가 지원하는 타입만 추출
	const supportedFormat = getSupportedFormats(mediaType).find(
		({ supported }) => supported,
	);

	return supportedFormat?.mimeType ?? null;
}
