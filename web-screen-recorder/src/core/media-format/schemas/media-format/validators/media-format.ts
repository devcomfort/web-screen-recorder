import { MediaFormatSchema } from "../schemas";
import type { MediaFormat } from "../types";

/**
 * `validateMediaFormat` 함수는 주어진 값이 `MediaFormat` 타입인지 검증합니다.
 * 이 함수는 `MediaFormatSchema`를 사용하여 값의 유효성을 검사하고, 유효한 경우 `true`를 반환합니다.
 *
 * @param value - 검증할 값
 * @returns 주어진 값이 `MediaFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * // 유효한 MediaFormat 객체
 * const validMediaFormat = {
 *   mediaType: "audio",
 *   codec: "opus",
 *   fileFormat: "webm"
 * };
 * console.log(validateMediaFormat(validMediaFormat)); // true
 *
 * @example
 * // 유효하지 않은 MediaFormat 객체
 * const invalidMediaFormat = {
 *   mediaType: "unknown",
 *   codec: "unknown",
 *   fileFormat: "unknown"
 * };
 * console.log(validateMediaFormat(invalidMediaFormat)); // false
 */
export function validateMediaFormat(value: unknown): value is MediaFormat {
	return MediaFormatSchema.safeParse(value).success;
}
