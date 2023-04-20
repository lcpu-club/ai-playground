import Dexie, { Table } from 'dexie'

export interface ISession {
  id?: number
  type: 'chat'
  name: string
  desc: string
  [key: string]: any
}

export class Database extends Dexie {
  sessions!: Table<ISession>

  constructor() {
    super('ai-playground')
    this.version(1).stores({
      sessions: '++id, type, name'
    })
  }
}

export const db = new Database()
