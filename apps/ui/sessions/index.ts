import chat from './chat'

export const sessionTypeList = [
  //
  chat
]

export const sessionTypes = Object.fromEntries(sessionTypeList.map((type) => [type.id, type]))
