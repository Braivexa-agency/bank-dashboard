import { useSyncExternalStore } from 'react'
import { uiStore, UiState, uiActions } from './uiStore'

export function useUiStore<T>(selector: (state: UiState) => T): T {
  return useSyncExternalStore(
    uiStore.subscribe,
    () => selector(uiStore.state),
    () => selector(uiStore.state)
  )
}

export const useUiActions = () => uiActions


