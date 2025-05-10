/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오 및 비디오 파일 형식을 검증하는 함수를 제공합니다.
 *
 * @module file-format/validators
 *
 * @exports validateAudioFormat - 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * @exports validateVideoFormat - 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 */
export { validateAudioFormat } from "./audio-format";
export { validateVideoFormat } from "./video-format";
