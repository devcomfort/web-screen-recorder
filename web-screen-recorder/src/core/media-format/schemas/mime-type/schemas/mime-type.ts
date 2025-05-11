import { z } from "zod";

/**
 * MIME 타입 스키마를 정의합니다.
 * 이 스키마는 MIME 타입의 주요 구성 요소인 `type`, `subtype`, `parameters`를 포함합니다.
 *
 * @property {string} type - MIME 타입의 주요 종류 (예: text, image, application)
 * @property {string} subtype - MIME 타입의 하위 종류 (예: html, jpeg, json)
 * @property {Record<string, string>} parameters - MIME 타입에 추가적인 정보를 제공하는 매개변수 (예: charset=utf-8)
 */
export const MIMETypeSchema = z
	.object({
		type: z.string(),
		subtype: z.string(),
		parameters: z.record(z.string(), z.string()),
	})
	.describe("MIME 타입 스키마");
