import { AxiosError } from 'axios'

import { CardPacksType, packsAPI } from '../../api/cards/packsAPI'
import { setAppStatusAC } from '../../app/appReducer'
import { ThunkType } from '../../bll/store'
import { utilsError } from '../../utils/utils_error'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  cardPacks: [] as Array<CardPacksType>,
  params: {
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '',
    page: 1,
    pageCount: 6,
    user_id: '',
  },
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 100,
  token: '',
  tokenDeathTime: 0,
}

//reducer
export const packsListReducer = (
  state: InitialStateType = initialState,
  action: PacksListActionType
): InitialStateType => {
  switch (action.type) {
    case 'packsList/GET_CARD_PACKS':
      return { ...state, cardPacks: action.cardPacks }
    case 'packsList/SET_PACK_PAGE':
      return { ...state, params: { ...state.params, page: action.page } }
    case 'packsList/SET_PACK_PAGE_COUNT':
      return { ...state, params: { ...state.params, pageCount: action.pageCount } }
    case 'packsList/SET_PACKS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }
    default:
      return state
  }
}

//AC
export const getCardPacksAC = (cardPacks: Array<CardPacksType>) =>
  ({ type: 'packsList/GET_CARD_PACKS', cardPacks } as const)

export const setPackPageAC = (page: number) => ({ type: 'packsList/SET_PACK_PAGE', page } as const)

export const setCardsPageCountAC = (pageCount: number) =>
  ({ type: 'packsList/SET_PACK_PAGE_COUNT', pageCount } as const)

export const setPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({
    type: 'packsList/SET_PACKS_TOTAL_COUNT',
    cardPacksTotalCount,
  } as const)

//TC
export const packsListTC = (): ThunkType => async (dispatch, getState) => {
  const { params } = getState().packsList

  dispatch(setAppStatusAC('loading'))

  try {
    const res = await packsAPI.getPacks(params)
    const { cardPacks, page, pageCount, cardPacksTotalCount } = res.data

    dispatch(getCardPacksAC(cardPacks))
    dispatch(setPackPageAC(page))
    dispatch(setCardsPageCountAC(pageCount))
    dispatch(setPacksTotalCountAC(cardPacksTotalCount))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const addPackTC =
  (packName: string, deckCover?: string): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.addPack(packName, deckCover)

      if (res) {
        dispatch(packsListTC())
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const updatePackTC =
  (_id: string, name: string, deckCover?: string): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.updatePack(_id, name)

      if (res) {
        dispatch(packsListTC())
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const deletePackTC =
  (id: string): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.deletePack(id)

      if (res) {
        dispatch(packsListTC())
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

//types
export type PacksListActionType =
  | ReturnType<typeof getCardPacksAC>
  | ReturnType<typeof setPackPageAC>
  | ReturnType<typeof setCardsPageCountAC>
  | ReturnType<typeof setPacksTotalCountAC>
