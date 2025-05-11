/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오, 비디오, 및 통합 미디어 파일 형식 타입을 제공합니다.
 *
 * @module media-format/types
 *
 * @description
 * 이 모듈은 오디오 및 비디오 파일 형식을 정의하는 타입을 내보냅니다. 각 타입은 다음과 같은 기능을 제공합니다:
 * - `AudioFormat`: 오디오 파일 형식을 정의합니다. `mediaType`, `codec`, `fileFormat` 속성을 포함하며, 각 속성은 오디오 파일의 유형, 코덱, 및 파일 형식을 나타냅니다.
 * - `VideoFormat`: 비디오 파일 형식을 정의합니다. `mediaType`, `codec`, `fileFormat` 속성을 포함하며, 각 속성은 비디오 파일의 유형, 코덱, 및 파일 형식을 나타냅니다.
 * - `MediaFormat`: 오디오 및 비디오 파일 형식을 통합하여 정의합니다. `AudioFormat`과 `VideoFormat`을 합쳐서 사용하며, 오디오와 비디오 파일 형식을 모두 처리할 수 있습니다.
 *
 * @exports AudioFormat - 오디오 파일 형식을 정의하는 타입
 * @exports VideoFormat - 비디오 파일 형식을 정의하는 타입
 * @exports MediaFormat - 오디오 및 비디오 파일 형식을 통합하여 정의하는 타입
 *
 * @example
 * // 오디오 파일 형식 타입 사용 예시
 * import { AudioFormat } from "web-screen-recorder/core/schemas/media-format/types";
 *
 * @example
 * // 비디오 파일 형식 타입 사용 예시
 * import { VideoFormat } from "web-screen-recorder/core/schemas/media-format/types";
 *
 * @example
 * // 통합 미디어 파일 형식 타입 사용 예시
 * import { MediaFormat } from "web-screen-recorder/core/schemas/media-format/types";
 *
 * @see ./audio-format - 오디오 파일 형식 타입 정의
 * @see ./video-format - 비디오 파일 형식 타입 정의
 * @see ./media-format - 통합 미디어 파일 형식 타입 정의
 */
export type { AudioFormat } from "./audio-format";
export type { VideoFormat } from "./video-format";
export type { MediaFormat } from "./media-format";
