import type { VideoFormatSchema } from "../schemas";
import type { z } from "zod";

/**
 * `VideoFormat` 타입은 `VideoFormatSchema`에서 추론된 타입입니다.
 * `VideoFormatSchema`는 비디오 파일 형식을 정의하는 Zod 스키마로, `mediaType`, `codec`, `fileFormat` 속성을 포함합니다.
 * - `mediaType`: "video"로 고정된 문자열입니다.
 * - `codec`: 비디오 코덱을 나타내는 `VideoCodecSchema`입니다.
 * - `fileFormat`: 비디오 파일 형식을 나타내는 `VideoFileFormatSchema`입니다.
 */
export type VideoFormat = z.infer<typeof VideoFormatSchema>;
