import { AudioFormatSchema } from "../schemas/audio-format";
import type { AudioFormat } from "../types/audio-format";

/**
 * 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * 이 함수는 `AudioFormatSchema`를 사용하여 주어진 값을 안전하게 파싱하고, 파싱이 성공했는지 여부를 반환합니다.
 *
 * @param value - 검증할 값
 * @returns 주어진 값이 `AudioFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```ts
 * validateAudioFormat("webm"); // true
 * validateAudioFormat("mp3"); // true
 * validateAudioFormat("wav"); // true
 * validateAudioFormat("ogg"); // true
 * validateAudioFormat("m4a"); // true
 * validateAudioFormat("mp4"); // false (비디오 형식)
 * validateAudioFormat("unknown"); // false (알 수 없는 형식)
 * ```
 */
export function validateAudioFormat(value: unknown): value is AudioFormat {
	return AudioFormatSchema.safeParse(value).success;
}
