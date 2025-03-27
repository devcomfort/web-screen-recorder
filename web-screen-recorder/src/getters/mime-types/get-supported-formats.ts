import type { MediaFormatSupport, MediaType } from "schemas";
import { isMimeTypeSupported } from "validators";
import { SUPPORTED_FORMATS } from "vars";

/**
 * 지정된 미디어 유형에 대한 지원되는 미디어 형식 목록을 반환합니다.
 *
 * @description
 * - 미디어 유형(`mediaType`)을 지정하면 해당 유형의 형식만 필터링됩니다.
 * - `undefined`로 전달 시 모든 미디어 형식의 지원 여부를 확인합니다.
 * - 각 형식에 대해 브라우저 지원 여부(`supported`)를 추가합니다.
 *
 * @param mediaType - 필터링할 미디어 유형 (`"video"` 또는 `"audio"`)
 * @returns 지원되는 미디어 형식 목록 (MIME 유형 및 지원 상태 포함)
 *
 * @example
 * // 모든 비디오 형식의 지원 상태 가져오기
 * const videoFormats = getSupportedFormats('video');
 *
 * @example
 * // 모든 미디어 형식의 지원 상태 가져오기
 * const allFormats = getSupportedFormats();
 */
export function getSupportedFormats(
	mediaType?: MediaType,
): MediaFormatSupport[] {
	return (
		SUPPORTED_FORMATS
			// 지정된 미디어 유형에 따라 형식 필터링
			// 미디어 유형이 지정되지 않은 경우 모든 형식 포함
			.filter((format) => !mediaType || format.mediaType === mediaType)
			// 각 형식에 브라우저 지원 여부 추가
			.map((format) => ({
				mimeType: format.mimeType,
				supported: isMimeTypeSupported(format.mimeType),
			}))
	);
}
