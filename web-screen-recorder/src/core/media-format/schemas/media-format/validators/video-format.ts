import { VideoFormatSchema } from "../schemas";
import type { VideoFormat } from "../types";

/**
 * `validateVideoFormat` 함수는 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 * 이 함수는 `VideoFormatSchema`를 사용하여 값의 유효성을 검사하고, 유효한 경우 `true`를 반환합니다.
 *
 * @param value 검증할 값
 * @returns 값이 `VideoFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * // 유효한 VideoFormat 객체
 * const validVideoFormat = {
 *   mediaType: "video",
 *   codec: "h264",
 *   fileFormat: "mp4"
 * };
 * console.log(validateVideoFormat(validVideoFormat)); // true
 *
 * @example
 * // 유효하지 않은 VideoFormat 객체
 * const invalidVideoFormat = {
 *   mediaType: "audio",
 *   codec: "h264",
 *   fileFormat: "mp4"
 * };
 * console.log(validateVideoFormat(invalidVideoFormat)); // false
 */
export function validateVideoFormat(value: unknown): value is VideoFormat {
	return VideoFormatSchema.safeParse(value).success;
}
