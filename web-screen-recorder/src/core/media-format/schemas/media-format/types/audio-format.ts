import type { AudioFormatSchema } from "../schemas";
import type { z } from "zod";

/**
 * `AudioFormat` 타입은 `AudioFormatSchema`에서 추론된 타입입니다.
 * `AudioFormatSchema`는 오디오 파일 형식을 정의하는 Zod 스키마로, `mediaType`, `codec`, `fileFormat` 속성을 포함합니다.
 * - `mediaType`: "audio"로 고정된 문자열입니다.
 * - `codec`: 오디오 코덱을 나타내는 `AudioCodecSchema`입니다.
 * - `fileFormat`: 오디오 파일 형식을 나타내는 `AudioFileFormatSchema`입니다.
 */
export type AudioFormat = z.infer<typeof AudioFormatSchema>;
