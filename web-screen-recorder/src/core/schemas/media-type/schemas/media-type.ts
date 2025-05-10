import { z } from "zod";

/**
 * 미디어 녹화 타입을 정의하는 Zod 스키마
 *
 * @summary
 * 녹화 대상(영상/음성/둘 모두)을 제한하는 타입 정의로,
 * WebRTC API와의 호환성을 고려한 스트림 제어를 지원합니다.
 *
 * @example
 * ```ts
 * // 유효한 타입 파싱 예시
 * MediaTypeSchema.parse("video");  // "video" 반환
 * MediaTypeSchema.parse("audio");  // "audio" 반환
 * MediaTypeSchema.parse("both");   // "both" 반환
 *
 * // 무효한 타입 처리 예시
 * MediaTypeSchema.safeParse("image");  // 에러 객체 반환
 * ```
 *
 * @enum {string}
 * @property {"video"} video - 영상 스트림만 녹화합니다.
 *   - 주요 사용처: 화면 캡처, 프레젠테이션 녹화
 *   - 기술적 특징:
 *     - `getDisplayMedia()` 권장 사용
 *     - 오디오 트랙 자동 제외
 *     - 시스템 사운드 포함 불가
 *   - 참고 사항: Chrome 76+에서만 partial capture 가능
 *
 * @property {"audio"} audio - 오디오 스트림만 녹화합니다.
 *   - 주요 사용처: 팟캐스트 녹음, 시스템 사운드 캡처
 *   - 기술적 특징:
 *     - `getUserMedia({ audio: true })` 권장 사용
 *     - 비디오 트랙 자동 제외
 *     - 하드웨어 마이크 접근 필요
 *   - 제한 사항: Safari는 audio-only 녹화 미지원
 *
 * @property {"both"} both - 영상과 오디오 스트림 동시 녹화
 *   - 주요 사용처: 웹 회의, 게임 플레이 녹화
 *   - 기술적 특징:
 *     - 동기화된 멀티미디어 스트림 제공
 *     - `getDisplayMedia({ audio: true })` 권장 사용
 *     - 브라우저 오디오 캡처 지원 필요
 *   - 제한 사항: Firefox는 system audio 캡처 불가
 */
export const MediaTypeSchema = z.enum(["video", "audio", "both"]);
