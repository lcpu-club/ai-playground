import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Observable } from 'rxjs'
import { db } from '~/libs/db'

export function useDatabase() {
  return { db }
}

export function useLiveQuery<T>(querier: () => T | Promise<T>) {
  return useObservable(liveQuery(querier) as unknown as Observable<T>)
}
