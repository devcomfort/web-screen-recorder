import type { MIMEType } from "./types";

/**
 * MIME 타입을 문자열로 변환하는 함수입니다.
 *
 * @param mimeType - 변환할 MIME 타입 객체
 * @returns 변환된 MIME 타입 문자열
 *
 * @example
 * const mimeType: MIMEType = {
 *   type: "text",
 *   subtype: "html",
 *   parameters: { charset: "utf-8" },
 * };
 * const result = toMIMETypeString(mimeType);
 * // "text/html; charset=utf-8"
 */
export function toMIMETypeString(mimeType: MIMEType): string {
	const parameters = Object.entries(mimeType.parameters)
		.map(([key, value]) => `${key}=${value}`)
		.join("; ");
	return `${mimeType.type}/${mimeType.subtype}${parameters ? `; ${parameters}` : ""}`;
}
