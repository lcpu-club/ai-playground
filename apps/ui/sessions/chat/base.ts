export interface IChatHistoryItem {
  role: 'user' | 'bot'
  message: string
}

export interface IChatContext {
  model: string
  history: IChatHistoryItem[]
}
