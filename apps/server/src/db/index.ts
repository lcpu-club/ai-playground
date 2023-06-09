import { MongoClient, ObjectId } from 'mongodb'

const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/aiplayground'

export const client = new MongoClient(MONGO_URL)
export const db = client.db()

export interface IUser {
  _id: string
  name: string
  email: string
  balance: Record<string, number>
  tags: string[]
}

export const users = db.collection<IUser>('users')

export interface ILoginAttempt {
  _id: string
  secret: string
  result: string
  timestamp: number
}

export const loginAttempts = db.collection<ILoginAttempt>('loginAttempts')
loginAttempts.createIndex({ timestamp: 1 }, { expireAfterSeconds: 5 * 60 }) // 5 minutes

export interface ILock {
  userId: string
  type: string
}

export const locks = db.collection<ILock>('locks')
locks.createIndex({ userId: 1, type: 1 }, { unique: true })
