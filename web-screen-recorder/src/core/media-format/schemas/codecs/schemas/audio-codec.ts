import { z } from "zod";

/**
 * `MediaRecorder API`에서 사용할 수 있는 오디오 코덱들을 정의합니다.
 * 각 코덱은 다음과 같은 의미를 가집니다:
 * - opus: 고음질 오디오 코덱. WebRTC에서 주로 사용되며, 다양한 비트 전송률을 지원합니다.
 * - vorbis: 오픈 소스 오디오 코덱. Firefox에서 주로 지원합니다.
 * - pcm: 비압축 오디오 형식입니다.
 * - aac: 고음질 오디오 코덱. MP4 컨테이너에서 주로 사용됩니다.
 *
 * 이 스키마는 Zod를 사용하여 타입 안전성을 보장하며,
 * `AudioCodec` 타입은 이 스키마를 기반으로 자동 생성됩니다.
 */
export const AudioCodecSchema = z.enum(["opus", "vorbis", "pcm", "aac"]);
