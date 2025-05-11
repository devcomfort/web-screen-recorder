import { AudioFileFormatSchema } from "../schemas/audio-file-format";
import type { AudioFileFormat } from "../types/audio-file-format";

/**
 * 주어진 값이 `AudioFileFormat` 타입인지 검증합니다.
 * 이 함수는 `AudioFileFormatSchema`를 사용하여 주어진 값을 안전하게 파싱하고, 파싱이 성공했는지 여부를 반환합니다.
 *
 * @param value - 검증할 값
 * @returns 주어진 값이 `AudioFileFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```ts
 * validateAudioFileFormat("webm"); // true
 * validateAudioFileFormat("mp3"); // true
 * validateAudioFileFormat("wav"); // true
 * validateAudioFileFormat("ogg"); // true
 * validateAudioFileFormat("m4a"); // true
 * validateAudioFileFormat("mp4"); // false (비디오 형식)
 * validateAudioFileFormat("unknown"); // false (알 수 없는 형식)
 * ```
 */
export function validateAudioFileFormat(
	value: unknown,
): value is AudioFileFormat {
	return AudioFileFormatSchema.safeParse(value).success;
}
