import z from "zod";

/** 미디어 타입 (비디오 또는 오디오) */
export const MediaTypeSchema = z.enum(["video", "audio"]);
/** 미디어 타입 (비디오 또는 오디오) */
export type MediaType = z.infer<typeof MediaTypeSchema>;
