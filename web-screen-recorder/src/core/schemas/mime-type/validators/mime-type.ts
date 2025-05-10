import type { MIMEType } from "../types";
import { MIMETypeSchema } from "../schemas";

/**
 * MIME 타입을 검증하는 함수입니다.
 *
 * @param value - 검증할 값
 * @returns 검증 결과. 값이 유효한 MIME 타입이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 */
export function validateMIMEType(value: unknown): value is MIMEType {
	return MIMETypeSchema.safeParse(value).success;
}
