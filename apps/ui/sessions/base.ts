import type { Component } from 'vue'

export interface ISessionTypeOptions {
  id: string
  name: string
  CreateView: Component
  SessionView: Component
}

export function defineSessionType(options: ISessionTypeOptions) {
  return options
}
