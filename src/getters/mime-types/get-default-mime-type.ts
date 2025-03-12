import type { MediaType } from "schemas";
import { getSupportedFormats } from "./get-supported-formats";

/**
 * 파라미터에 따라 적절한 기본 MIME 타입 찾기
 * @param mediaType 미디어 타입
 * @returns 지원되는 기본 MIME 타입 또는 null
 */
export function getDefaultMimeType(mediaType: MediaType): string | null {
	const supportedFormats = getSupportedFormats(mediaType).filter(
		(format) => format.supported,
	);

	return supportedFormats.length > 0 ? supportedFormats[0].mimeType : null;
}
