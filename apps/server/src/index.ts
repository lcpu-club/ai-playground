import fastify from 'fastify'
import { logger } from './util/logger.js'
import { api } from './api/index.js'

const server = fastify({ logger })
await server.register(api, { prefix: '/api' })
await server.listen({
  port: 4000
})
