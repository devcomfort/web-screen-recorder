/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 오디오 및 비디오 파일 형식을 검증하는 함수를 제공합니다.
 *
 * @module file-format/validators
 *
 * @exports validateAudioFileFormat - 주어진 값이 `AudioFileFormat` 타입인지 검증합니다.
 * @exports validateVideoFileFormat - 주어진 값이 `VideoFileFormat` 타입인지 검증합니다.
 */
export { validateAudioFileFormat } from "./audio-file-format";
export { validateVideoFileFormat } from "./video-file-format";
