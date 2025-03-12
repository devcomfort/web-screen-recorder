import type { MediaFormat } from "schemas";

/**
 * 지원되는 미디어 형식 목록
 */
export const SUPPORTED_FORMATS: MediaFormat[] = [
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
