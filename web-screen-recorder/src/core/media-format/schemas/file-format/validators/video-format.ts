import { VideoFormatSchema } from "../schemas/video-format";
import type { VideoFormat } from "../types/video-format";

/**
 * 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 * 이 함수는 `VideoFormatSchema`를 사용하여 주어진 값을 안전하게 파싱하고, 파싱이 성공했는지 여부를 반환합니다.
 *
 * @param value - 검증할 값
 * @returns 주어진 값이 `VideoFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```ts
 * validateVideoFormat("webm"); // true
 * validateVideoFormat("mp4"); // true
 * validateVideoFormat("ogg"); // true
 * validateVideoFormat("m4v"); // true
 * validateVideoFormat("avi"); // true
 * validateVideoFormat("mp3"); // false (오디오 형식)
 * validateVideoFormat("unknown"); // false (알 수 없는 형식)
 * ```
 */
export function validateVideoFormat(value: unknown): value is VideoFormat {
	return VideoFormatSchema.safeParse(value).success;
}
