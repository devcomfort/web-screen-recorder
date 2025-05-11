import type { AudioFormatSchema } from "../schemas/audio-format";
import type { z } from "zod";

/**
 * `AudioFormat` 타입은 `MediaRecorder API`에서 사용할 수 있는 모든 음원 파일 형식을 정의합니다.
 * 이 타입은 `AudioFormatSchema` enum 스키마에서 추론됩니다.
 * 각 파일 형식은 다음과 같은 의미를 가집니다:
 * - webm: WebM 파일 형식
 * - mp3: MP3 파일 형식
 * - wav: WAV 파일 형식
 * - ogg: Ogg 파일 형식
 * - m4a: MPEG-4 오디오 파일 형식
 */
export type AudioFormat = z.infer<typeof AudioFormatSchema>;
