import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { users } from '../db/index.js'

export const user: FastifyPluginAsyncTypebox = async (server) => {
  server.get('/profile', async (req) => {
    const { userId } = req.user
    const user = await users.findOne({ _id: userId })
    if (!user) throw server.httpErrors.notFound()
    return user
  })
}
