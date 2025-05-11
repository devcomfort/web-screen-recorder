import type { AudioCodecSchema } from "../schemas/audio-codec";
import type { z } from "zod";

/**
 * AudioCodec 타입은 MediaRecorder API에서 사용 가능한 오디오 코덱을 나타냅니다.
 * 이 타입은 AudioCodecSchema Zod enum을 기반으로 자동 생성되며,
 * "opus", "vorbis", "pcm", "aac" 네 가지 가능한 값이 있습니다.
 *
 * 각 코덱의 상세한 설명은 audio-codec.ts 스키마 파일의 JSDoc을 참조하세요.
 */
export type AudioCodec = z.infer<typeof AudioCodecSchema>;
