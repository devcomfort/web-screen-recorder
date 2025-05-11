import { AudioFormatSchema } from "../schemas";
import type { AudioFormat } from "../types";

/**
 * `validateAudioFormat` 함수는 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * 이 함수는 `AudioFormatSchema`를 사용하여 값의 유효성을 검사하고, 유효한 경우 `true`를 반환합니다.
 *
 * @param value 검증할 값
 * @returns 값이 `AudioFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * // 유효한 AudioFormat 객체
 * const validAudioFormat = {
 *   mediaType: "audio",
 *   codec: "aac",
 *   fileFormat: "mp4"
 * };
 * console.log(validateAudioFormat(validAudioFormat)); // true
 *
 * @example
 * // 유효하지 않은 AudioFormat 객체
 * const invalidAudioFormat = {
 *   mediaType: "video",
 *   codec: "aac",
 *   fileFormat: "mp4"
 * };
 * console.log(validateAudioFormat(invalidAudioFormat)); // false
 */
export function validateAudioFormat(value: unknown): value is AudioFormat {
	return AudioFormatSchema.safeParse(value).success;
}
