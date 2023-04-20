import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { users } from '../db/index.js'

export const user: FastifyPluginAsyncTypebox = async (server) => {
  server.get('/profile', async (req) => {
    const { userId } = req.user
    const user = await users.findOne({ _id: userId })
    if (!user) throw server.httpErrors.notFound()
    return user
  })

  server.put(
    '/profile',
    {
      schema: {
        body: Type.Partial(
          Type.Object({
            name: Type.String(),
            email: Type.String()
          }),
          { additionalProperties: false }
        )
      }
    },
    async (req) => {
      const { userId } = req.user
      const user = await users.findOne({ _id: userId })
      if (!user) throw server.httpErrors.notFound()
      await users.updateOne({ _id: userId }, { $set: req.body })
      return 0
    }
  )
}
