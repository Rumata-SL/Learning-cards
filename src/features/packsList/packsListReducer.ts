import { AxiosError } from 'axios'

import { CardPacksType, packsListAPI } from '../../api/cards/packsListAPI'
import { setAppStatusAC } from '../../app/appReducer'
import { ThunkType } from '../../bll/store'
import { utilsError } from '../../utils/utils_error'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  cardPacks: [] as Array<CardPacksType>,
  deckData: {
    packName: '',
    minCount: 0,
    maxCount: 100,
    sortPacks: '',
    page: 1,
    pageCount: 5,
    user_id: '',
  },
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 100,
  token: '',
  tokenDeathTime: 0,
  isMyDeck: false,
}

//reducer
export const packsListReducer = (
  state: InitialStateType = initialState,
  action: PacksListActionType
): InitialStateType => {
  switch (action.type) {
    case 'packsList/GET_CARD_PACKS':
      return { ...state, cardPacks: action.payload.cardPacks }
    case 'packsList/SET_PACK_PAGE':
      return { ...state, deckData: { ...state.deckData, page: action.payload.page } }
    case 'packsList/SET_PACK_PAGE_COUNT':
      return { ...state, deckData: { ...state.deckData, pageCount: action.payload.pageCount } }
    case 'packsList/SET_PACKS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.payload.cardPacksTotalCount }
    case 'packsList/SEARCH_PACK_NAME':
      return { ...state, deckData: { ...state.deckData, packName: action.payload.packName } }
    case 'packsList/SET_FILTER_MY_ALL_PACK':
      return { ...state, isMyDeck: action.payload.isMyDeck }
    case 'packsList/SET_MIN_COUNT_MAX_COUNT':
      return {
        ...state,
        deckData: {
          ...state.deckData,
          minCount: action.payload.value[0],
          maxCount: action.payload.value[1],
        },
      }
    case 'packsList/CHANGE_FILTER_MY_ALL':
      return { ...state, deckData: { ...state.deckData, user_id: action.payload.value } }
    default:
      return state
  }
}

//AC
export const getCardPacksAC = (cardPacks: Array<CardPacksType>) =>
  ({
    type: 'packsList/GET_CARD_PACKS',
    payload: {
      cardPacks,
    },
  } as const)

export const setPackPageAC = (page: number) =>
  ({ type: 'packsList/SET_PACK_PAGE', payload: { page } } as const)

export const setCardsPageCountAC = (pageCount: number) =>
  ({ type: 'packsList/SET_PACK_PAGE_COUNT', payload: { pageCount } } as const)

export const setPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({
    type: 'packsList/SET_PACKS_TOTAL_COUNT',
    payload: { cardPacksTotalCount },
  } as const)

export const searchPackNameAC = (packName: string) =>
  ({ type: 'packsList/SEARCH_PACK_NAME', payload: { packName } } as const)

export const setFilterPacksAC = (isMyDeck: boolean) =>
  ({ type: 'packsList/SET_FILTER_MY_ALL_PACK', payload: { isMyDeck } } as const)

export const setMinCountMaxCountAC = (value: Array<number>) =>
  ({ type: 'packsList/SET_MIN_COUNT_MAX_COUNT', payload: { value } } as const)

export const changeFilterMyAllAC = (value: string) =>
  ({ type: 'packsList/CHANGE_FILTER_MY_ALL', payload: { value } } as const)

//TC
export const packsListTC = (): ThunkType => async (dispatch, getState) => {
  const { deckData } = getState().packsList

  dispatch(setAppStatusAC('loading'))

  try {
    const res = await packsListAPI.getPacks(deckData)
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
      const res = await packsListAPI.addPack(packName, deckCover)

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
  (_id: string, name: string): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsListAPI.updatePack(_id, name)

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
      const res = await packsListAPI.deletePack(id)

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

export const resetAllFiltersTC = (): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    dispatch(searchPackNameAC(''))
    dispatch(setFilterPacksAC(false))
    dispatch(setMinCountMaxCountAC([0, 100]))
    dispatch(packsListTC())
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
  | ReturnType<typeof searchPackNameAC>
  | ReturnType<typeof setFilterPacksAC>
  | ReturnType<typeof setMinCountMaxCountAC>
  | ReturnType<typeof changeFilterMyAllAC>
