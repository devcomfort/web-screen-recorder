import { z } from "zod";
import { AudioFormatSchema } from "./audio-format";
import { VideoFormatSchema } from "./video-format";

/**
 * `MediaFormatSchema`는 오디오 및 비디오 파일 형식을 통합하여 정의하는 Zod 스키마입니다.
 * 이 스키마는 `AudioFormatSchema`와 `VideoFormatSchema`를 합쳐서 사용하며, 각 스키마는 다음과 같은 속성을 포함합니다:
 *
 * - `AudioFormatSchema`:
 *   - `mediaType`: "audio"로 고정된 문자열입니다. 이 값은 오디오 파일임을 나타냅니다.
 *   - `codec`: 오디오 코덱을 나타내는 `AudioCodecSchema`입니다. 코덱은 오디오 데이터를 인코딩/디코딩하는 방식을 정의합니다.
 *   - `fileFormat`: 오디오 파일 형식을 나타내는 `AudioFileFormatSchema`입니다. 파일 형식은 오디오 데이터를 저장하는 컨테이너를 정의합니다.
 *
 * - `VideoFormatSchema`:
 *   - `mediaType`: "video"로 고정된 문자열입니다. 이 값은 비디오 파일임을 나타냅니다.
 *   - `codec`: 비디오 코덱을 나타내는 `VideoCodecSchema`입니다. 코덱은 비디오 데이터를 인코딩/디코딩하는 방식을 정의합니다.
 *   - `fileFormat`: 비디오 파일 형식을 나타내는 `VideoFileFormatSchema`입니다. 파일 형식은 비디오 데이터를 저장하는 컨테이너를 정의합니다.
 *
 * 이 스키마는 `MediaFormat` 타입을 생성하는 데 사용되며, `validateMediaFormat` 함수를 통해 값의 유효성을 검증할 수 있습니다.
 */
export const MediaFormatSchema = z.union([
	AudioFormatSchema,
	VideoFormatSchema,
]);
