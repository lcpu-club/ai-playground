export interface IChatHistoryItem {
  role: 'user' | 'bot'
  message: string
  usage?: Record<string, number>
  cost?: number
}

export interface IChatContext {
  model: string
  history: IChatHistoryItem[]
}
