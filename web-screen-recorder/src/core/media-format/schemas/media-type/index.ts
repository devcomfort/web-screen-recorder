/**
 * 미디어 타입 모듈
 *
 * @description
 * 이 모듈은 녹화 대상 스트림 유형을 나타내는 `MediaType` 타입, 해당 타입의 스키마 정의 `MediaTypeSchema`, 그리고 유효성 검사 함수 `validateMediaType`를 제공합니다.
 *
 * @exports MediaTypeSchema - 미디어 타입 스키마 정의
 * @exports MediaType - 미디어 타입의 타입 정의
 * @exports validateMediaType - 미디어 타입 유효성 검사 함수
 *
 * @see MediaTypeSchema - 미디어 타입 스키마 정의
 * @see MediaType - 미디어 타입 타입 정의
 * @see validateMediaType - 미디어 타입 유효성 검사 함수
 *
 * @example
 * ```ts
 * // 모듈 사용 예시
 * import { MediaType, MediaTypeSchema, validateMediaType } from "web-screen-recorder/core/schemas/media-type";
 *
 * const mediaType: MediaType = "both";
 * if (validateMediaType(mediaType)) {
 *   console.log("유효한 미디어 타입입니다.");
 * }
 * ```
 */

export { MediaTypeSchema } from "./schemas";
export type { MediaType } from "./types";
export { validateMediaType } from "./validators";
