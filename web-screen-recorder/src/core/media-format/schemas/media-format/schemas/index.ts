/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오, 비디오, 및 통합 미디어 파일 형식 스키마를 제공합니다.
 *
 * @module media-format/schemas
 *
 * @description
 * 이 모듈은 오디오 및 비디오 파일 형식을 정의하는 Zod 스키마를 내보냅니다. 각 스키마는 다음과 같은 기능을 제공합니다:
 * - `AudioFormatSchema`: 오디오 파일 형식을 정의합니다. `mediaType`, `codec`, `fileFormat` 속성을 포함하며, 각 속성은 오디오 파일의 유형, 코덱, 및 파일 형식을 나타냅니다.
 * - `VideoFormatSchema`: 비디오 파일 형식을 정의합니다. `mediaType`, `codec`, `fileFormat` 속성을 포함하며, 각 속성은 비디오 파일의 유형, 코덱, 및 파일 형식을 나타냅니다.
 * - `MediaFormatSchema`: 오디오 및 비디오 파일 형식을 통합하여 정의합니다. `AudioFormatSchema`와 `VideoFormatSchema`를 합쳐서 사용하며, 오디오와 비디오 파일 형식을 모두 처리할 수 있습니다.
 *
 * @exports AudioFormatSchema - 오디오 파일 형식을 정의하는 Zod 스키마
 * @exports VideoFormatSchema - 비디오 파일 형식을 정의하는 Zod 스키마
 * @exports MediaFormatSchema - 오디오 및 비디오 파일 형식을 통합하여 정의하는 Zod 스키마
 *
 * @example
 * // 오디오 파일 형식 스키마 사용 예시
 * import { AudioFormatSchema } from "web-screen-recorder/core/schemas/media-format/schemas";
 *
 * @example
 * // 비디오 파일 형식 스키마 사용 예시
 * import { VideoFormatSchema } from "web-screen-recorder/core/schemas/media-format/schemas";
 *
 * @example
 * // 통합 미디어 파일 형식 스키마 사용 예시
 * import { MediaFormatSchema } from "web-screen-recorder/core/schemas/media-format/schemas";
 *
 * @see ./audio-format - 오디오 파일 형식 스키마 구현
 * @see ./video-format - 비디오 파일 형식 스키마 구현
 * @see ./media-format - 통합 미디어 파일 형식 스키마 구현
 */
export { AudioFormatSchema } from "./audio-format";
export { VideoFormatSchema } from "./video-format";
export { MediaFormatSchema } from "./media-format";
