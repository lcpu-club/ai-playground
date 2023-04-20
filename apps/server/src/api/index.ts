import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifyJwt from '@fastify/jwt'
import { logger } from '../util/logger.js'
import { system } from './system.js'
import { login } from './login.js'

const JWT_SECRET = process.env.JWT_SECRET ?? 'superSECRET'

declare module 'fastify' {
  interface FastifyContextConfig {
    bypassAuth?: boolean
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string }
    user: { userId: string }
  }
}

export const api: FastifyPluginAsyncTypebox = async (server) => {
  await server.register(fastifySensible)
  await server.register(fastifyJwt, {
    secret: JWT_SECRET
  })
  // @ts-ignore
  await server.register(fastifyRateLimit, {})
  server.addHook('onRequest', async (req) => {
    if (req.routeConfig.bypassAuth) return
    const header = req.headers.authorization
    if (typeof header !== 'string') {
      throw server.httpErrors.unauthorized()
    }
    try {
      await req.jwtVerify()
    } catch (err) {
      logger.info(err)
      throw server.httpErrors.unauthorized()
    }
  })
  await server.register(system, { prefix: '/system' })
  await server.register(login, { prefix: '/login' })
}
