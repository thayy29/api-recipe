import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().trim(),
  email: z.string(),
})
