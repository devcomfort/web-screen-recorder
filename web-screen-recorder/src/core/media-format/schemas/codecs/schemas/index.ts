/**
 * 오디오/비디오 코덱 스키마 모듈
 *
 * @description
 * 이 모듈은 미디어 녹화를 위한 오디오 및 비디오 코덱 스키마를 제공합니다.
 * - `AudioCodecSchema`: 오디오 코덱 형식 검증을 위한 Zod 스키마
 * - `VideoCodecSchema`: 비디오 코덱 형식 검증을 위한 Zod 스키마
 *
 * @module codecs/schemas
 *
 * @exports AudioCodecSchema - 오디오 코덱 스키마
 * @exports VideoCodecSchema - 비디오 코덱 스키마
 *
 * @example
 * // 오디오 코덱 스키마 사용 예시
 * import { AudioCodecSchema } from "./audio-codec";
 *
 * @example
 * // 비디오 코덱 스키마 사용 예시
 * import { VideoCodecSchema } from "./video-codec";
 *
 * @see ./audio-codec - 오디오 코덱 타입 정의
 * @see ./video-codec - 비디오 코덱 타입 정의
 * @see ../types - 코덱 관련 타입 정의
 */
export { AudioCodecSchema } from "./audio-codec";
export { VideoCodecSchema } from "./video-codec";
