import type { z } from "zod";
import type { MediaTypeSchema } from "../schemas";

/**
 * 미디어 타입의 타입 정의
 *
 * @description
 * 녹화 대상 스트림 유형을 나타내는 타입 안전한 enum
 * - `'video'`: 비디오 스트림만 녹화 (오디오 제외)
 * - `'audio'`: 오디오 스트림만 녹화 (비디오 제외)
 * - `'both'`: 비디오와 오디오 스트림 동시 녹화
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API
 *
 * @usage
 * ```ts
 * // 기본값 설정 예시
 * const defaultMediaType: MediaType = "both";
 *
 * // 조건부 처리 예시
 * if (mediaType === "video") {
 *   // 비디오 전용 녹화 로직
 * }
 * ```
 *
 * @constraints
 * - 브라우저 호환성:
 *   - `both`: Chrome 76+, Edge 18+, Firefox 66+
 *   - `audio`: Safari 14.1+ (limited)
 * - 권한 요구사항:
 *   - `audio`/`both`: 사용자 미디어 권한 필요
 *   - `video`/`both`: 화면 공유 권한 필요
 */
export type MediaType = z.infer<typeof MediaTypeSchema>;
