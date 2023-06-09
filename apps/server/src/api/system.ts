import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { loginAttempts, users } from '../db/index.js'

const SYSTEM_TOKEN = process.env.SYSTEM_TOKEN ?? 'topSECRET'

export const system: FastifyPluginAsyncTypebox = async (server) => {
  server.addHook('onRequest', async (req) => {
    if (req.headers['x-system-token'] !== SYSTEM_TOKEN) {
      throw server.httpErrors.unauthorized()
    }
  })

  server.post(
    '/register',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Object({
          _id: Type.String(),
          name: Type.String(),
          email: Type.String({ format: 'email' }),
          balance: Type.Record(Type.String(), Type.Number()),
          tags: Type.Array(Type.String())
        })
      }
    },
    async (req) => {
      const { _id, name, email, balance, tags } = req.body
      await users.insertOne({
        _id,
        name,
        email,
        balance,
        tags
      })
      return { _id }
    }
  )

  server.post(
    '/login',
    {
      config: {
        bypassAuth: true
      },
      schema: {
        body: Type.Object({
          attemptId: Type.String(),
          userId: Type.String()
        })
      }
    },
    async (req, rep) => {
      const user = await users.findOne({ _id: req.body.userId })
      if (!user) throw server.httpErrors.notFound()
      const token = await rep.jwtSign({ userId: req.body.userId })
      await loginAttempts.updateOne({ _id: req.body.attemptId }, { $set: { result: token } })
      return { token }
    }
  )
}
