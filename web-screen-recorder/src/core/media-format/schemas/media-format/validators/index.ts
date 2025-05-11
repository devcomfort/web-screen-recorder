/**
 * 미디어 형식 검증 모듈
 *
 * @description
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오, 비디오, 및 미디어 형식을 검증하는 함수를 제공합니다.
 * - `validateAudioFormat`: 주어진 값이 유효한 오디오 파일 형식인지 검증합니다.
 * - `validateVideoFormat`: 주어진 값이 유효한 비디오 파일 형식인지 검증합니다.
 * - `validateMediaFormat`: 주어진 값이 유효한 미디어 형식인지 검증합니다.
 *
 * @module media-format/validators
 *
 * @example
 * // 오디오 형식 검증 사용 예시
 * import { validateAudioFormat } from "web-screen-recorder/core/schemas/media-format/validators";
 * const isValid = validateAudioFormat("mp3"); // boolean 반환
 *
 * @example
 * // 비디오 형식 검증 사용 예시
 * import { validateVideoFormat } from "web-screen-recorder/core/schemas/media-format/validators";
 * const isValid = validateVideoFormat("mp4"); // boolean 반환
 *
 * @example
 * // 미디어 형식 검증 사용 예시
 * import { validateMediaFormat } from "web-screen-recorder/core/schemas/media-format/validators";
 * const isValid = validateMediaFormat("mp4"); // boolean 반환
 *
 * @see ./audio-format - 오디오 형식 검증 로직 정의
 * @see ./video-format - 비디오 형식 검증 로직 정의
 * @see ./media-format - 미디어 형식 검증 로직 정의
 * @see ../types - 형식 관련 타입 정의
 */
export { validateAudioFormat } from "./audio-format";
export { validateVideoFormat } from "./video-format";
export { validateMediaFormat } from "./media-format";
