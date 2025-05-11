/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오 및 비디오 파일 형식을 정의합니다.
 *
 * @module file-format/schemas
 *
 * @exports AudioFormatSchema - 오디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 * @exports VideoFormatSchema - 비디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 */
export { AudioFormatSchema } from "./audio-format";
export { VideoFormatSchema } from "./video-format";
