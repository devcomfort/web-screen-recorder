/**
 * 오디오/비디오 코덱 관련 스키마, 타입, 검증 함수를 통합한 모듈입니다.
 *
 * @module codecs
 *
 * @description
 * 이 모듈은 미디어 처리에 필요한 오디오 및 비디오 코덱 관련 기능을 통합 제공합니다.
 * - `AudioCodecSchema`, `VideoCodecSchema`: Zod 기반 코덱 스키마
 * - `AudioCodec`, `VideoCodec`: 타입 정의
 * - `validateAudioCodec`, `validateVideoCodec`: 유효성 검증 함수
 *
 * @exports AudioCodecSchema - 오디오 코덱 Zod 스키마
 * @exports VideoCodecSchema - 비디오 코덱 Zod 스키마
 * @exports AudioCodec - 오디오 코덱 타입 정의
 * @exports VideoCodec - 비디오 코덱 타입 정의
 * @exports validateAudioCodec - 오디오 코덱 검증 함수
 * @exports validateVideoCodec - 비디오 코덱 검증 함수
 *
 * @example
 * // 전체 내보내기 사용 예시
 * import {
 *   AudioCodecSchema,
 *   VideoCodecSchema,
 *   AudioCodec,
 *   VideoCodec,
 *   validateAudioCodec
 * } from "web-screen-recorder/core/schemas/codecs";
 *
 * @see ./schemas - 코덱 스키마 구현
 * @see ./types - 코덱 타입 정의
 * @see ./validators - 코덱 검증 함수
 */

export { AudioCodecSchema, VideoCodecSchema } from "./schemas";
export type { AudioCodec, VideoCodec } from "./types";
export { validateAudioCodec, validateVideoCodec } from "./validators";
