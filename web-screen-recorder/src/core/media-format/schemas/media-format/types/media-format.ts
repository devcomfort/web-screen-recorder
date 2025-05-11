import type { z } from "zod";
import type { MediaFormatSchema } from "../schemas/media-format";

export type MediaFormat = z.infer<typeof MediaFormatSchema>;
