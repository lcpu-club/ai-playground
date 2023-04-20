import got from 'got'
import io from 'socket.io-client'

const WECHAT_SERVER_URL = process.env.WECHAT_SERVER_URL ?? 'http://localhost:3113'
const PLAYGROUND_URL = process.env.PLAYGROUND_URL ?? 'http://localhost:4000/api'
const SYSTEM_TOKEN = process.env.SYSTEM_TOKEN ?? 'topSECRET'

interface IChatroomConfig {
  tags: string[]
  balance: Record<string, number>
}

const enabledChatrooms: Record<string, IChatroomConfig> = {
  '34567271162@chatroom': {
    tags: ['Test'],
    balance: {
      chatd: 10000
    }
  },
  '23333702307@chatroom': {
    tags: ['LCPU Member'],
    balance: {
      chatd: 10
    }
  },
  '49398943428@chatroom': {
    tags: ['LCPU AP'],
    balance: {
      chatd: 100
    }
  }
}

const socket = io(WECHAT_SERVER_URL)
const client = got.extend({
  headers: {
    'x-system-token': SYSTEM_TOKEN
  },
  prefixUrl: PLAYGROUND_URL
})

interface IMessageContext {
  msgid: string
  msgSvrid: string
  newMsgid: string
  msgType: number
  status: number
  flag: number
  createTime: string
  fromUsername: string
  toUsername: string
  chatroomMemberUsername: string
  content: string
  conversationName: string
  talkerId: string
  msgSeq: string
}

interface IMessageHandler {
  (ctx: IMessageContext, ...args: string[]): Promise<string> | string
}

const handlers: Record<string, IMessageHandler> = {
  whoami(ctx) {
    const id = ctx.chatroomMemberUsername
    return `Your ID is: ${id}`
  },
  async login(ctx, token) {
    try {
      await client.post('system/login', {
        json: {
          attemptId: token,
          userId: ctx.chatroomMemberUsername
        }
      })
      return '登录成功'
    } catch (err) {
      console.log(err)
      return '登录失败'
    }
  },
  async register(ctx, token) {
    try {
      const config = enabledChatrooms[ctx.conversationName]
      await client.post('system/register', {
        json: {
          _id: ctx.chatroomMemberUsername,
          name: ctx.chatroomMemberUsername,
          email: `changeme@some.com`,
          balance: config.balance,
          tags: config.tags
        }
      })
      return '注册成功'
    } catch (err) {
      console.log(err)
      return '注册失败'
    }
  }
}

const prompt = '/ai/'

socket.on('notify', async (ev) => {
  try {
    if (ev.typeName === 'kMessageUpdateEvent') {
      const msg = ev.decoded.newMsg as IMessageContext
      console.log(msg)
      if (!(msg.conversationName in enabledChatrooms)) return
      if (msg.toUsername === msg.chatroomMemberUsername) {
        console.log('fuck')
        return
      }
      const content = msg.content
      const cmdline = content.split('\n')[0].trimEnd()
      const [cmd, ...args] = cmdline
        .split(' ')
        .map((arg) => arg.trim())
        .filter((arg) => arg)
      if (!cmd.startsWith(prompt)) return
      const actualCmd = cmd.substring(prompt.length)
      const handler = handlers[actualCmd]
      if (handler) {
        const result = await handler(msg, ...args)
        await socket.emitWithAck('invoke', 'MessageManager.sendTextMessageAsync', [
          [0, ev.decoded.newMsg.conversationName, result]
        ])
      } else {
        console.log('no handler for', cmd)
      }
    }
  } catch (err) {
    console.log(err)
  }
})

console.log('Bot started!')
