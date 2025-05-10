/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오 및 비디오 파일 형식을 정의하고 검증하는 기능을 제공합니다.
 *
 * @module file-format
 *
 * @exports AudioFormatSchema - 오디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 * @exports VideoFormatSchema - 비디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 * @exports AudioFormat - 오디오 파일 형식을 나타내는 타입입니다.
 * @exports VideoFormat - 비디오 파일 형식을 나타내는 타입입니다.
 * @exports validateAudioFormat - 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * @exports validateVideoFormat - 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 */
export { AudioFormatSchema, VideoFormatSchema } from "./schemas";
export type { AudioFormat, VideoFormat } from "./types";
export { validateAudioFormat, validateVideoFormat } from "./validators";
