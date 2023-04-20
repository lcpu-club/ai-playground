import { defineSessionType } from '../base'
import CreateView from './CreateView.vue'
import SessionView from './SessionView.vue'

export default defineSessionType({
  id: 'chat',
  name: 'Chat',
  CreateView,
  SessionView
})
