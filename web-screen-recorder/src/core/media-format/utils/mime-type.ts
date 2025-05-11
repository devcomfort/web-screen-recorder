import type { MIMEType as _MIMEType } from "../schemas";

export namespace MIMEType {
	/**
	 * `toMIMETypeString` 함수는 MIME 타입 객체를 MIME 타입 문자열로 변환합니다.
	 *
	 * @param mimeType - 변환할 MIME 타입 객체. `type`, `subtype`, `parameters` 속성을 포함합니다.
	 * - `type`: MIME 타입의 주형식을 나타내는 문자열입니다.
	 * - `subtype`: MIME 타입의 하위 형식을 나타내는 문자열입니다.
	 * - `parameters`: MIME 타입의 추가 파라미터를 포함하는 객체입니다. 이 객체는 키-값 쌍으로 구성됩니다.
	 *
	 * @returns 변환된 MIME 타입 문자열. `parameters`가 존재하면 각 파라미터를 `;`로 구분하여 문자열에 추가합니다.
	 *
	 * @example
	 * const mimeType: _MIMEType = {
	 *   type: "video",
	 *   subtype: "mp4",
	 *   parameters: { codecs: "avc1.640028" },
	 * };
	 * const result = MIMEType.toMIMETypeString(mimeType);
	 * // "video/mp4; codecs=avc1.640028"
	 */
	export function toMIMETypeString(mimeType: _MIMEType): string {
		const parameters = Object.entries(mimeType.parameters ?? {})
			.map(([key, value]) => `${key}=${value}`)
			.join("; ");
		return `${mimeType.type}/${mimeType.subtype}${parameters ? `; ${parameters}` : ""}`;
	}
}
