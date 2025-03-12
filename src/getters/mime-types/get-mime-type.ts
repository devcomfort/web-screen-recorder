import type { MediaType } from "schemas";
import { isMimeTypeSupported } from "validators";
import { SUPPORTED_FORMATS } from "vars";

/**
 * 특정 미디어 타입, 코덱, 컨테이너에 해당하는 MIME 타입 반환
 * @param mediaType 미디어 타입
 * @param codec 코덱
 * @param container 컨테이너 형식
 * @returns 해당하는 MIME 타입 또는 null (지원되지 않는 경우)
 */
export function getMimeType(
	mediaType: MediaType,
	codec: string,
	container: string,
): string | null {
	const format = SUPPORTED_FORMATS.find(
		(f) =>
			f.mediaType === mediaType &&
			f.codec === codec &&
			f.container === container,
	);

	if (format && isMimeTypeSupported(format.mimeType)) {
		return format.mimeType;
	}

	return null;
}
