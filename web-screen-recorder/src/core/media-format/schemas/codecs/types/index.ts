/**
 * 코덱 타입 모듈
 *
 * @description
 * 이 모듈은 오디오 및 비디오 코덱 타입을 정의하고 제공합니다. 이 타입들은 애플리케이션 내에서 미디어 처리 및 인코딩 설정 시 사용됩니다.
 *
 * @module codecs/types
 *
 * @exports AudioCodec - 오디오 코덱 타입 정의
 * @exports VideoCodec - 비디오 코덱 타입 정의
 *
 * @example
 * // 오디오 코덱 타입 사용 예시
 * import type { AudioCodec } from "web-screen-recorder/core/schemas/codecs/types";
 *
 * const codec: AudioCodec = "aac";
 * console.log(codec); // "aac"
 */

export type { AudioCodec } from "./audio-codec";
export type { VideoCodec } from "./video-codec";
