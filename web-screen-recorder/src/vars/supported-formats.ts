import type { MIMEType } from "schemas";

/**
 * 라이브러리가 지원하는 미디어 형식 목록
 * 
 * @note 브라우저가 지원하는지 여부와는 무관함.
 */
export const SYSTEM_SUPPORTED_FORMATS: MIMEType[] = [
	// 비디오 형식
	{
		mediaType: "video",
		codec: "h264",
		container: "webm",
		mimeType: "video/webm;codecs=h264",
	},
	{
		mediaType: "video",
		codec: "vp8",
		container: "webm",
		mimeType: "video/webm;codecs=vp8",
	},
	{
		mediaType: "video",
		codec: "vp9",
		container: "webm",
		mimeType: "video/webm;codecs=vp9",
	},
	{
		mediaType: "video",
		codec: "h264",
		container: "mp4",
		mimeType: "video/mp4;codecs=h264",
	},

	// 오디오 형식
	{
		mediaType: "audio",
		codec: "opus",
		container: "webm",
		mimeType: "audio/webm;codecs=opus",
	},
	{
		mediaType: "audio",
		codec: "vorbis",
		container: "webm",
		mimeType: "audio/webm;codecs=vorbis",
	},
	{
		mediaType: "audio",
		codec: "aac",
		container: "mp4",
		mimeType: "audio/mp4;codecs=aac",
	},
	{
		mediaType: "audio",
		codec: "mp3",
		container: "mpeg",
		mimeType: "audio/mpeg",
	},
];
