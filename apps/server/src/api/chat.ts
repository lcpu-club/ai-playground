import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'

const API_ENDPOINT = process.env.CHAT_API_ENDPOINT ?? ''
const API_TOKEN = process.env.CHAT_API_TOKEN ?? ''

export const chat: FastifyPluginAsyncTypebox = async (server) => {
  server.post(
    '/infer',
    {
      schema: {
        body: Type.Object({
          prompt: Type.String(),
          maxTokens: Type.Number({ minimum: 1, maximum: 1000 }),
          temperature: Type.Number({ minimum: 0, maximum: 1 }),
          topP: Type.Number({ minimum: 0, maximum: 1 }),
          presencePenalty: Type.Number({ minimum: 0, maximum: 1 }),
          frequencyPenalty: Type.Number({ minimum: 0, maximum: 1 }),
          modelName: Type.String()
        })
      }
    },
    async (req) => {
      const resp = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
          prompt: req.body.prompt,
          max_tokens: '' + req.body.maxTokens,
          temperature: '' + req.body.temperature,
          top_p: '' + req.body.topP,
          presence_penalty: '' + req.body.presencePenalty,
          frequency_penalty: '' + req.body.frequencyPenalty,
          model: req.body.modelName
        })
      })
      const data = await resp.json()
      if (data.status !== 'ok') throw server.httpErrors.badGateway()
      const { text, usage } = data
      console.log(usage)
      return { text }
    }
  )
}
