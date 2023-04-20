import chat from '~/sessions/chat'

const list = [
  //
  chat
]
const types = Object.fromEntries(list.map((type) => [type.id, type]))

export function useSessionTypes() {
  return { list, types }
}
