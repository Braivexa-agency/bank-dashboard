import { useSyncExternalStore } from 'react'
import { dataStore, DataState, dataActions } from './dataStore'

export function useDataStore<T>(selector: (state: DataState) => T): T {
  return useSyncExternalStore(
    dataStore.subscribe,
    () => selector(dataStore.state),
    () => selector(dataStore.state)
  )
}

export const useDataActions = () => dataActions
