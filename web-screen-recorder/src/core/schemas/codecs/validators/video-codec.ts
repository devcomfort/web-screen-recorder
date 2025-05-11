import type { VideoCodec } from "../types";
import { VideoCodecSchema } from "../schemas/video-codec";

/**
 * 비디오 코덱 유효성을 검사하는 함수
 *
 * @param {unknown} value - 검사할 비디오 코덱 값
 * @returns {value is VideoCodec} - 코덱이 유효한 경우 true, 그렇지 않은 경우 false
 *
 * @description
 * 이 함수는 `VideoCodecSchema`를 사용하여 주어진 비디오 코덱 값이 유효한지 검사합니다.
 * `safeParse` 메서드를 통해 코덱 값을 파싱하고, 파싱 결과의 `success` 속성을 반환합니다.
 * `success` 속성이 true이면 코덱이 유효한 것으로 간주됩니다.
 *
 * @example
 * // 유효한 코덱 검사
 * const isValid = validateVideoCodec("vp8");
 * console.log(isValid); // true
 *
 * // 유효하지 않은 코덱 검사
 * const isInvalid = validateVideoCodec("hevc");
 * console.log(isInvalid); // false
 */
export function validateVideoCodec(value: unknown): value is VideoCodec {
	return VideoCodecSchema.safeParse(value).success;
}
