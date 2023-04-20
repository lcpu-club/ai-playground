import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { nanoid } from 'nanoid/async'
import { loginAttempts } from '../db/index.js'

export const login: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/attempt',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute'
        }
      }
    },
    async () => {
      const _id = await nanoid()
      const secret = await nanoid()
      loginAttempts.insertOne({
        _id,
        secret,
        result: '',
        timestamp: Date.now()
      })
    }
  )

  server.post(
    '/poll',
    {
      schema: {
        body: Type.Object({
          _id: Type.String(),
          secret: Type.String()
        })
      }
    },
    async (req) => {
      const { _id, secret } = req.body
      const loginAttempt = await loginAttempts.findOne({ _id, secret })
      if (!loginAttempt) throw server.httpErrors.notFound()
      return { result: loginAttempt.result }
    }
  )
}
