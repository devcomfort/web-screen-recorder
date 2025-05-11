/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 다양한 미디어 형식과 코덱을 정의하고 검증하는 기능을 제공합니다.
 *
 * @module media-format
 *
 * @description
 * - `AudioFormatSchema`, `VideoFormatSchema`, `MediaFormatSchema`: Zod 기반 미디어 형식 스키마
 * - `AudioFormat`, `VideoFormat`, `MediaFormat`: 미디어 형식 타입 정의
 * - `validateAudioFormat`, `validateVideoFormat`, `validateMediaFormat`: 미디어 형식 유효성 검증 함수
 *
 * @exports AudioFormatSchema - 오디오 파일 형식을 나타내는 Zod enum 스키마
 * @exports VideoFormatSchema - 비디오 파일 형식을 나타내는 Zod enum 스키마
 * @exports MediaFormatSchema - 미디어 형식을 나타내는 Zod enum 스키마
 * @exports AudioFormat - 오디오 파일 형식을 나타내는 타입
 * @exports VideoFormat - 비디오 파일 형식을 나타내는 타입
 * @exports MediaFormat - 미디어 형식을 나타내는 타입
 * @exports validateAudioFormat - 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * @exports validateVideoFormat - 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 * @exports validateMediaFormat - 주어진 값이 `MediaFormat` 타입인지 검증합니다.
 *
 * @example
 * // 전체 내보내기 사용 예시
 * import {
 *   AudioFormatSchema,
 *   VideoFormatSchema,
 *   MediaFormatSchema,
 *   AudioFormat,
 *   VideoFormat,
 *   MediaFormat,
 *   validateAudioFormat,
 *   validateVideoFormat,
 *   validateMediaFormat
 * } from "web-screen-recorder/core/schemas/media-format";
 *
 * @see ./schemas - 미디어 형식 스키마 구현
 * @see ./types - 미디어 형식 타입 정의
 * @see ./validators - 미디어 형식 검증 함수
 */

export {
	AudioFormatSchema,
	MediaFormatSchema,
	VideoFormatSchema,
} from "./schemas";
export type { AudioFormat, MediaFormat, VideoFormat } from "./types";
export { validateAudioFormat } from "./validators/audio-format";
export { validateVideoFormat } from "./validators/video-format";
export { validateMediaFormat } from "./validators/media-format";
