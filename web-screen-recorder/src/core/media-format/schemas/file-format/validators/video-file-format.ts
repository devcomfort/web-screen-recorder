import { VideoFileFormatSchema } from "../schemas/video-file-format";
import type { VideoFileFormat } from "../types/video-file-format";

/**
 * 주어진 값이 `VideoFileFormat` 타입인지 검증합니다.
 * 이 함수는 `VideoFileFormatSchema`를 사용하여 주어진 값을 안전하게 파싱하고, 파싱이 성공했는지 여부를 반환합니다.
 * `VideoFileFormat`은 `MediaRecorder API`에서 지원하는 비디오 파일 형식들을 포함하며, 다음과 같은 형식들이 있습니다:
 * - `webm`: WebM 파일 형식 (.webm)
 * - `mp4`: MPEG-4 Part 14 파일 형식 (.mp4)
 * - `mov`: QuickTime 파일 형식 (.mov)
 * - `ogg`: Ogg 파일 형식 (.ogg)
 * - `flv`: Flash Video 파일 형식 (.flv)
 * - `avi`: Audio Video Interleave 파일 형식 (.avi)
 * - `mkv`: Matroska 파일 형식 (.mkv)
 * - `m4v`: MPEG-4 비디오 파일 형식 (.m4v)
 *
 * @param value - 검증할 값
 * @returns 주어진 값이 `VideoFileFormat` 타입이면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```ts
 * validateVideoFileFormat("webm"); // true
 * validateVideoFileFormat("mp4"); // true
 * validateVideoFileFormat("ogg"); // true
 * validateVideoFileFormat("m4v"); // true
 * validateVideoFileFormat("avi"); // true
 * validateVideoFileFormat("mp3"); // false (오디오 형식)
 * validateVideoFileFormat("unknown"); // false (알 수 없는 형식)
 * ```
 */
export function validateVideoFileFormat(
	value: unknown,
): value is VideoFileFormat {
	return VideoFileFormatSchema.safeParse(value).success;
}
