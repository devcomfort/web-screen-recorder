/**
 * MIME 타입 관련 모듈입니다.
 *
 * 이 모듈은 MIME 타입을 다루는 다양한 기능을 제공합니다. 주요 기능으로는:
 * - MIME 타입 스키마 (`MIMETypeSchema`)
 * - MIME 타입 타입 정의 (`MIMEType`)
 * - MIME 타입 검증 함수 (`validateMIMEType`)
 * - MIME 타입 객체를 문자열로 변환하는 함수 (`toMIMETypeString`)
 *
 * @module
 */
export { MIMETypeSchema } from "./schemas";
export type { MIMEType } from "./types";
export { validateMIMEType } from "./validators";

export { toMIMETypeString } from "./to-mime-type-string";
