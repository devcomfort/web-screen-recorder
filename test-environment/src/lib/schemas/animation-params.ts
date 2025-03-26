import z from "zod";

import { AnimationConfig_ } from "./animation-config";
import { InputRangeConfig_ } from "./input-range-config";

export const AnimationParamsSchema = z.object({
	animationConfig: AnimationConfig_,
	inputRangeConfig: InputRangeConfig_,
});

export type AnimationParams = z.infer<typeof AnimationParamsSchema>;
