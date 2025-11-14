// user.schema.ts
import { z } from 'zod'

export const tb_test1_zod = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
})

export type tb_test1_zod_i = z.infer<typeof tb_test1_zod>
