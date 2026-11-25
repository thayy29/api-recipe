import { recipesSchema } from './recipes.schemas.js'

describe('recipesSchema', () => {
  it('deve falhar quando title tem menos de 3 caracteres', () => {
    const resultado = recipesSchema.safeParse({
      title: 'ab', // ❌ inválido
      description: 'teste',
      ingredients: 'sal',
      instructions: 'misture bem',
      timePrep: 10,
    })

    expect(resultado.success).toBe(false)
  })
})
