/**
 * VideoCodec 타입은 MediaRecorder API에서 사용 가능한 비디오 코덱을 나타냅니다.
 * 이 타입은 VideoCodecSchema Zod enum을 기반으로 자동 생성되며,
 * "vp8", "vp9", "h264" 세 가지 가능한 값이 있습니다.
 *
 * 각 코덱의 상세한 설명은 video-codec.ts 스키마 파일의 JSDoc을 참조하세요.
 */
import type { VideoCodecSchema } from "../schemas/video-codec";
import type { z } from "zod";

export type VideoCodec = z.infer<typeof VideoCodecSchema>;
