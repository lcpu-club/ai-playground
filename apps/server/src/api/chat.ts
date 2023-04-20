import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { locks, users } from '../db/index.js'

const API_ENDPOINT = process.env.CHAT_API_ENDPOINT ?? ''
const API_TOKEN = process.env.CHAT_API_TOKEN ?? ''

const costs: Record<string, number> = {
  'gpt-3.5-turbo': 0.002,
  'gpt-4': 0.03
}

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
      const user = await users.findOne({ _id: req.user.userId })
      if (!user) throw server.httpErrors.badRequest()
      if (!(req.body.modelName in costs)) throw server.httpErrors.badRequest()
      const costPerToken = costs[req.body.modelName]
      const balance = user.balance['chatd'] ?? 0
      if (balance < costPerToken) throw server.httpErrors.paymentRequired()

      const { insertedId } = await locks.insertOne({
        userId: req.user.userId,
        type: 'chat'
      })

      try {
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
        const cost = usage.total_tokens * costPerToken
        const newBalance = balance - cost
        await users.updateOne({ _id: req.user.userId }, { $set: { 'balance.chatd': newBalance } })
        await locks.deleteOne({ _id: insertedId })
        return { text, usage, cost }
      } catch (err) {
        await locks.deleteOne({ _id: insertedId })
        throw err
      }
    }
  )
}
