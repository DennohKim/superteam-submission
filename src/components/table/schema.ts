import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const actionSchema = z.object({
    ninety_day_volume: z.number(),
    one_day_volume: z.number(),
    pool_ids: z.array(z.union([z.string(), z.null()])), 
    projects: z.array(z.string()),
    seven_day_volume: z.number(),
    seven_day_volume_liquidity_ratio: z.union([z.number(), z.null()]).optional(),
    split: z.string(),
    thirty_day_volume: z.number(),
    token_a_mint: z.string(),
    token_b_mint: z.string(),
    token_pair: z.string(),
    usd_liquidity: z.union([z.number(), z.null()]).optional() 
});

export type Action = z.infer<typeof actionSchema>