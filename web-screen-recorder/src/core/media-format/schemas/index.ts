/**
 * 이 모듈은 `MediaRecorder API`에서 사용할 수 있는 다양한 미디어 형식과 코덱을 정의하고 검증하는 기능을 제공합니다.
 *
 * @module media-format
 */

/**
 * 오디오 및 비디오 코덱 관련 기능
 *
 * @exports AudioCodecSchema - 오디오 코덱을 나타내는 Zod enum 스키마입니다.
 * @exports VideoCodecSchema - 비디오 코덱을 나타내는 Zod enum 스키마입니다.
 * @exports AudioCodec - 오디오 코덱을 나타내는 타입입니다.
 * @exports VideoCodec - 비디오 코덱을 나타내는 타입입니다.
 * @exports validateAudioCodec - 주어진 값이 `AudioCodec` 타입인지 검증합니다.
 * @exports validateVideoCodec - 주어진 값이 `VideoCodec` 타입인지 검증합니다.
 */
export {
	AudioCodecSchema,
	VideoCodecSchema,
	type AudioCodec,
	type VideoCodec,
	validateAudioCodec,
	validateVideoCodec,
} from "./codecs";

/**
 * 오디오 및 비디오 파일 형식 관련 기능
 *
 * @exports AudioFormatSchema - 오디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 * @exports VideoFormatSchema - 비디오 파일 형식을 나타내는 Zod enum 스키마입니다.
 * @exports AudioFormat - 오디오 파일 형식을 나타내는 타입입니다.
 * @exports VideoFormat - 비디오 파일 형식을 나타내는 타입입니다.
 * @exports validateAudioFormat - 주어진 값이 `AudioFormat` 타입인지 검증합니다.
 * @exports validateVideoFormat - 주어진 값이 `VideoFormat` 타입인지 검증합니다.
 */
export {
	AudioFileFormatSchema,
	VideoFileFormatSchema,
	type AudioFileFormat,
	type VideoFileFormat,
	validateAudioFileFormat,
	validateVideoFileFormat,
} from "./file-format";

/**
 * 미디어 타입 관련 기능
 *
 * @exports MediaTypeSchema - 미디어 타입을 나타내는 Zod enum 스키마입니다.
 * @exports MediaType - 미디어 타입을 나타내는 타입입니다.
 * @exports validateMediaType - 주어진 값이 `MediaType` 타입인지 검증합니다.
 */
export {
	MediaTypeSchema,
	type MediaType,
	validateMediaType,
} from "./media-type";

/**
 * MIME 타입 관련 기능
 *
 * @exports MIMETypeSchema - MIME 타입을 나타내는 Zod enum 스키마입니다.
 * @exports MIMEType - MIME 타입을 나타내는 타입입니다.
 * @exports validateMIMEType - 주어진 값이 `MIMEType` 타입인지 검증합니다.
 */
export {
	MIMETypeSchema,
	type MIMEType,
	validateMIMEType,
} from "./mime-type";

/**
 * 미디어 형식 관련 기능
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
 */
export {
	AudioFormatSchema,
	VideoFormatSchema,
	MediaFormatSchema,
	type AudioFormat,
	type VideoFormat,
	type MediaFormat,
	validateAudioFormat,
	validateVideoFormat,
	validateMediaFormat,
} from "./media-format";
