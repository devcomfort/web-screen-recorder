import type { MediaFormat as _MediaFormat, MIMEType } from "../schemas";
import * as F from "fp-ts/function";
import { MIMEType as $MIMEType } from "./mime-type";

export namespace MediaFormat {
	/**
	 * `toMIMEType` 함수는 `MediaFormat` 객체를 받아서 해당하는 MIME 타입 객체를 반환합니다.
	 *
	 * @param mediaFormat - `MediaFormat` 객체로, `mediaType`, `codec`, `fileFormat` 속성을 포함합니다.
	 * - `mediaType`: "audio" 또는 "video"로 고정된 문자열입니다. 이 값은 오디오 또는 비디오 스트림의 종류를 나타냅니다.
	 * - `codec`: 오디오 또는 비디오 코덱을 나타내는 문자열입니다. 이 값은 스트림의 코덱 정보를 제공합니다.
	 * - `fileFormat`: 오디오 또는 비디오 파일 형식을 나타내는 문자열입니다. 이 값은 파일의 형식을 나타냅니다.
	 *
	 * @returns - `MIMEType` 객체로, 다음과 같은 속성을 포함합니다:
	 * - `type`: "audio" 또는 "video"로 고정된 문자열입니다. 이 값은 MIME 타입의 주형식을 나타냅니다.
	 * - `subtype`: 파일 형식을 나타내는 문자열입니다. 이 값은 MIME 타입의 하위 형식을 나타냅니다.
	 * - `parameters`: 코덱 정보를 포함하는 객체입니다.
	 *   - `codecs`: 코덱을 나타내는 문자열입니다. 이 값은 MIME 타입의 파라미터로 사용됩니다.
	 */
	export function toMIMEType(mediaFormat: _MediaFormat): MIMEType {
		const { mediaType, codec, fileFormat } = mediaFormat;

		return {
			type: mediaType,
			subtype: fileFormat,
			parameters: {
				codecs: codec,
			},
		};
	}

	/**
	 * `isSupportedFormat` 함수는 주어진 `MediaFormat` 객체가 브라우저에서 지원되는지 확인합니다.
	 *
	 * @param mediaFormat - `MediaFormat` 객체로, `mediaType`, `codec`, `fileFormat` 속성을 포함합니다.
	 * - `mediaType`: "audio" 또는 "video"로 고정된 문자열입니다. 이 값은 오디오 또는 비디오 스트림의 종류를 나타냅니다.
	 * - `codec`: 오디오 또는 비디오 코덱을 나타내는 문자열입니다. 이 값은 스트림의 코덱 정보를 제공합니다.
	 * - `fileFormat`: 오디오 또는 비디오 파일 형식을 나타내는 문자열입니다. 이 값은 파일의 형식을 나타냅니다.
	 *
	 * @returns - 주어진 `MediaFormat` 객체가 브라우저에서 지원되는 경우 `true`, 그렇지 않은 경우 `false`를 반환합니다.
	 *
	 * @example
	 * const mediaFormat: _MediaFormat = {
	 *   mediaType: "video",
	 *   codec: "vp9",
	 *   fileFormat: "webm",
	 * };
	 * const isSupported = MediaFormat.isSupportedFormat(mediaFormat);
	 * // `isSupported`는 브라우저에서 "video/webm; codecs=vp9"를 지원하는지에 따라 `true` 또는 `false`가 됩니다.
	 */
	export function isSupportedFormat(mediaFormat: _MediaFormat): boolean {
		return F.pipe(
			mediaFormat,
			toMIMEType,
			$MIMEType.toMIMETypeString,
			MediaRecorder.isTypeSupported,
		);
	}
}
