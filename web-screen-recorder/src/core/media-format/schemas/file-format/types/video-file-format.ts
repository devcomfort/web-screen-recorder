import type { VideoFileFormatSchema } from "../schemas";
import type { z } from "zod";

/**
 * `VideoFileFormat` 타입은 `MediaRecorder API`에서 사용할 수 있는 모든 비디오 파일 형식을 정의합니다.
 * 이 타입은 `VideoFileFormatSchema` enum 스키마에서 추론됩니다.
 * 각 파일 형식은 다음과 같은 의미를 가집니다:
 * - `webm`: WebM 파일 형식 (.webm)
 * - `mp4`: MPEG-4 Part 14 파일 형식 (.mp4)
 * - `mov`: QuickTime 파일 형식 (.mov)
 * - `ogg`: Ogg 파일 형식 (.ogg)
 * - `flv`: Flash Video 파일 형식 (.flv)
 * - `avi`: Audio Video Interleave 파일 형식 (.avi)
 * - `mkv`: Matroska 파일 형식 (.mkv)
 * - `m4v`: MPEG-4 비디오 파일 형식 (.m4v)
 */
export type VideoFileFormat = z.infer<typeof VideoFileFormatSchema>;
