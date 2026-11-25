import z from 'zod'

//Cadastro e Login
export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})
