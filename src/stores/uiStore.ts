import { Store } from '@tanstack/store'

type DialogKind = 'add' | 'edit' | 'delete' | null

export interface UiState {
  informationSheetDialog: DialogKind
  informationSheetCurrentId: number | null
  bankDialog: DialogKind
  bankCurrentId: number | null
  nonBankDialog: DialogKind
  nonBankCurrentId: number | null
}

const initialState: UiState = {
  informationSheetDialog: null,
  informationSheetCurrentId: null,
  bankDialog: null,
  bankCurrentId: null,
  nonBankDialog: null,
  nonBankCurrentId: null,
}

export const uiStore = new Store<UiState>(initialState)

export const uiActions = {
  openInformationSheet(dialog: Exclude<DialogKind, null>, id?: number) {
    uiStore.setState((s: UiState) => ({
      ...s,
      informationSheetDialog: dialog,
      informationSheetCurrentId: id ?? null,
    }))
  },
  closeInformationSheet() {
    uiStore.setState((s: UiState) => ({
      ...s,
      informationSheetDialog: null,
      informationSheetCurrentId: null,
    }))
  },
  openBank(dialog: Exclude<DialogKind, null>, id?: number) {
    uiStore.setState((s: UiState) => ({
      ...s,
      bankDialog: dialog,
      bankCurrentId: id ?? null,
    }))
  },
  closeBank() {
    uiStore.setState((s: UiState) => ({
      ...s,
      bankDialog: null,
      bankCurrentId: null,
    }))
  },
  openNonBank(dialog: Exclude<DialogKind, null>, id?: number) {
    uiStore.setState((s: UiState) => ({
      ...s,
      nonBankDialog: dialog,
      nonBankCurrentId: id ?? null,
    }))
  },
  closeNonBank() {
    uiStore.setState((s: UiState) => ({
      ...s,
      nonBankDialog: null,
      nonBankCurrentId: null,
    }))
  },
}


