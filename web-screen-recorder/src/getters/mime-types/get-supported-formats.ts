import type { MediaFormatSupport, MediaType } from "schemas";
import { isMimeTypeSupported } from "validators";
import { SUPPORTED_FORMATS } from "vars";

/**
 * 현재 브라우저에서 지원하는 미디어 형식 목록 반환
 * @param mediaType 미디어 타입 (비디오 또는 오디오)
 * @returns 지원되는 형식 목록
 */
export function getSupportedFormats(
	mediaType?: MediaType,
): MediaFormatSupport[] {
	return SUPPORTED_FORMATS.filter(
		(format) => !mediaType || format.mediaType === mediaType,
	).map((format) => ({
		mimeType: format.mimeType,
		supported: isMimeTypeSupported(format.mimeType),
	}));
}
