import z from "zod";

export const InputRangeConfig_ = z.object({
	duration: z.number().gt(0).describe("input:range의 총 재생 시간 값"),
	step: z.number().gt(0).default(0.001).describe("input:range의 step 속성값"),
});

export type InputRangeConfig = z.infer<typeof InputRangeConfig_>;
