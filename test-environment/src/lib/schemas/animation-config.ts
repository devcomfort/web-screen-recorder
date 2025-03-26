import z from "zod";

export const AnimationConfig_ = z.object({
	animationInterval: z
		.number()
		.min(0)
		.describe("초당 애니메이션 진행도 (1이면 애니메이션을 초당 1씩 진행함)"),
});

export type AnimationConfig = z.infer<typeof AnimationConfig_>;
