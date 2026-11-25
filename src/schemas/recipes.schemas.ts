import z from 'zod'

export const recipesSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3).optional(),
  ingredients: z.string().min(1),
  instructions: z.string().min(10),
  timePrep: z.number().positive(),
})
