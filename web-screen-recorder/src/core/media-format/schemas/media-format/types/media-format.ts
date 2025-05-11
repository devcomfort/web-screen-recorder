import type { z } from "zod";
import type { MediaFormatSchema } from "../schemas/media-format";

/**
 * `MediaFormat` 타입은 `MediaFormatSchema`에서 추론된 타입입니다.
 * `MediaFormatSchema`는 오디오 및 비디오 파일 형식을 통합하여 정의하는 Zod 스키마로, 다음과 같은 속성을 포함합니다:
 * - `mediaType`: "audio" 또는 "video"로 고정된 문자열입니다. 이 값은 파일이 오디오 파일인지 비디오 파일인지 나타냅니다.
 * - `codec`: 파일의 코덱을 나타내는 타입입니다. 오디오 파일의 경우 `AudioCodecSchema`, 비디오 파일의 경우 `VideoCodecSchema`입니다.
 * - `fileFormat`: 파일 형식을 나타내는 타입입니다. 오디오 파일의 경우 `AudioFileFormatSchema`, 비디오 파일의 경우 `VideoFileFormatSchema`입니다.
 *
 * 이 타입은 `MediaFormatSchema`를 통해 생성되며, `validateMediaFormat` 함수를 통해 값의 유효성을 검증할 수 있습니다.
 */
export type MediaFormat = z.infer<typeof MediaFormatSchema>;
