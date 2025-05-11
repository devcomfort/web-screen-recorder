/**
 * 코덱 검증 모듈
 *
 * @description
 * 이 모듈은 오디오 및 비디오 코덱 유효성을 검증하는 함수를 제공합니다.
 * 코덱 검증은 미디어 녹화 설정 시 사용 가능한 코덱 형식을 보장하는 데 사용됩니다.
 *
 * @module codecs/validators
 *
 * @exports validateAudioCodec - 오디오 코덱 유효성 검증 함수
 * @exports validateVideoCodec - 비디오 코덱 유효성 검증 함수
 *
 * @example
 * // 오디오 코덱 검증 사용 예시
 * import { validateAudioCodec } from "web-screen-recorder/core/schemas/codecs/validators";
 *
 * const isValid = validateAudioCodec("aac"); // boolean 반환
 *
 * @example
 * // 비디오 코덱 검증 사용 예시
 * import { validateVideoCodec } from "web-screen-recorder/core/schemas/codecs/validators";
 *
 * const isValid = validateVideoCodec("h264"); // boolean 반환
 *
 * @see ./audio-codec - 오디오 코덱 검증 로직 정의
 * @see ./video-codec - 비디오 코덱 검증 로직 정의
 * @see ../types - 코덱 타입 정의
 */
export { validateAudioCodec } from "./audio-codec";
export { validateVideoCodec } from "./video-codec";
