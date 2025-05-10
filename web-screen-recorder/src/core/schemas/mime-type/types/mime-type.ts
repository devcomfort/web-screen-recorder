import type { MIMETypeSchema } from "../schemas/mime-type";
import type { z } from "zod";

/**
 * MIME 타입을 나타내는 타입입니다.
 * 이 타입은 MIMETypeSchema에서 추론됩니다.
 *
 * @type {MIMEType}
 * @example
 * // MIME 타입 타입 사용
 * const mimeType: MIMEType = {
 *   type: "text",
 *   subtype: "html",
 *   parameters: { charset: "utf-8" },
 * };
 */
export type MIMEType = z.infer<typeof MIMETypeSchema>;
