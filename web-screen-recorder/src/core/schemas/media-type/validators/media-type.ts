import type { MediaType } from "../types";
import { MediaTypeSchema } from "../schemas";

/**
 * 미디어 타입 유효성 검사 함수
 *
 * @summary
 * 주어진 값이 유효한 `MediaType`인지 확인합니다.
 *
 * @param {unknown} value - 검사할 값
 * @returns {value is MediaType} - 값이 유효한 `MediaType`이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```ts
 * // 유효한 타입 검사 예시
 * validateMediaType("video");  // true
 * validateMediaType("audio");  // true
 * validateMediaType("both");   // true
 *
 * // 무효한 타입 검사 예시
 * validateMediaType("image");  // false
 * validateMediaType(123);      // false
 * validateMediaType({});       // false
 * ```
 *
 * @see MediaTypeSchema - 미디어 타입 스키마 정의
 * @see MediaType - 미디어 타입 타입 정의
 */
export function validateMediaType(value: unknown): value is MediaType {
	return MediaTypeSchema.safeParse(value).success;
}
