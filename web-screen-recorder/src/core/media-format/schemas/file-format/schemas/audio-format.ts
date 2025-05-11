import { z } from "zod";

/**
 * MediaRecorder API로 입력할 수 있는 모든 음원 파일 형식을 정의합니다.
 * 각 파일 형식은 다음과 같은 의미를 가집니다:
 * - webm: WebM 파일 형식
 * - mp3: MP3 파일 형식
 * - wav: WAV 파일 형식
 * - ogg: Ogg 파일 형식
 * - m4a: MPEG-4 오디오 파일 형식
 */
export const AudioFormatSchema = z.enum(["webm", "mp3", "wav", "ogg", "m4a"]);
