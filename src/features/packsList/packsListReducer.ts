import { AxiosError } from 'axios'

import { CardPacksType, packsListAPI, PacksRequestType } from '../../api/cards/packsListAPI'
import { setAppStatusAC } from '../../app/appReducer'
import { ThunkType } from '../../bll/store'
import { utilsError } from '../../utils/utils_error'

import { setIsDeletedAC, setPackDeckCoverAC, setPackNameAC } from './pack/packReducer'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  cardPacks: [] as Array<CardPacksType>,
  filtersModel: {
    packName: '',
    min: 0,
    max: 100,
    sortPacks: '',
    page: 1,
    pageCount: 5,
    user_id: '',
    block: false,
  } as PacksRequestType,
  isDeleted: false,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 100,
  page: 1,
  pageCount: 5,
  isMyPack: false,
  token: '',
  tokenDeathTime: 0,
}

//reducer
export const packsListReducer = (
  state: InitialStateType = initialState,
  action: PacksListActionType
): InitialStateType => {
  switch (action.type) {
    case 'packsList/SET_CARD_PACKS':
      return { ...state, cardPacks: action.payload.cardPacks }
    case 'packsList/SET_PAGE':
      return { ...state, page: action.payload.page }
    case 'packsList/SET_PAGE_COUNT':
      return {
        ...state,
        pageCount: action.payload.pageCount,
      }
    case 'packsList/SET_PACKS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.payload.cardPacksTotalCount }
    case 'packsList/SET_IS_MY_PACKS':
      return { ...state, isMyPack: action.payload.isMyPack }
    case 'packsList/SET_MIN_MAX_CARDS_COUNT':
      return {
        ...state,
        minCardsCount: action.payload.minCardsCount,
        maxCardsCount: action.payload.maxCardsCount,
      }
    case 'packsList/CHANGE_FILTERS':
      return { ...state, filtersModel: { ...state.filtersModel, ...action.payload.filtersModel } }
    case 'packsList/RESET_FILTERS':
      return {
        ...state,
        filtersModel: {
          packName: '',
          min: 0,
          max: 100,
          sortPacks: '',
          page: 1,
          pageCount: 5,
          user_id: '',
          block: false,
        },
      }

    default:
      return state
  }
}

//AC
export const setCardPacksAC = (cardPacks: Array<CardPacksType>) =>
  ({
    type: 'packsList/SET_CARD_PACKS',
    payload: {
      cardPacks,
    },
  } as const)

export const setPageAC = (page: number) =>
  ({ type: 'packsList/SET_PAGE', payload: { page } } as const)

export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packsList/SET_PAGE_COUNT', payload: { pageCount } } as const)

export const setPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({
    type: 'packsList/SET_PACKS_TOTAL_COUNT',
    payload: { cardPacksTotalCount },
  } as const)

export const setIsMyPacksAC = (isMyPack: boolean) =>
  ({ type: 'packsList/SET_IS_MY_PACKS', payload: { isMyPack } } as const)

export const setMinMaxCardsCountAC = (minCardsCount: number, maxCardsCount: number) =>
  ({
    type: 'packsList/SET_MIN_MAX_CARDS_COUNT',
    payload: { minCardsCount, maxCardsCount },
  } as const)

export const changeFiltersAC = (filtersModel: PacksRequestType) =>
  ({ type: 'packsList/CHANGE_FILTERS', payload: { filtersModel } } as const)

export const resetFiltersAC = () => ({ type: 'packsList/RESET_FILTERS' } as const)

//TC
export const fetchPacksTC = (): ThunkType => async (dispatch, getState) => {
  const { filtersModel } = getState().packsList

  dispatch(setAppStatusAC('loading'))

  try {
    const res = await packsListAPI.getPacks(filtersModel)
    const { cardPacks, page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount } =
      res.data

    dispatch(setCardPacksAC(cardPacks))
    dispatch(setPageAC(page))
    dispatch(setPageCountAC(pageCount))
    dispatch(setPacksTotalCountAC(cardPacksTotalCount))
    dispatch(setMinMaxCardsCountAC(minCardsCount, maxCardsCount))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    // utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const addPackTC =
  (packName: string, deckCover?: string, isPrivate?: boolean): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsListAPI.addPack(packName, deckCover, isPrivate)

      if (res) {
        dispatch(fetchPacksTC())
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const updatePackTC =
  (_id: string, deckCover: string, name: string, isPrivate?: boolean): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsListAPI.updatePack(_id, deckCover, name, isPrivate)

      if (res) {
        dispatch(fetchPacksTC())
        dispatch(setPackNameAC(name))
        dispatch(setPackDeckCoverAC(deckCover))
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
        dispatch(fetchPacksTC())
        dispatch(setIsDeletedAC(true))
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
    dispatch(resetFiltersAC())
    dispatch(setIsMyPacksAC(false))
    dispatch(fetchPacksTC())
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

//types
export type PacksListActionType =
  | ReturnType<typeof setCardPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setPacksTotalCountAC>
  | ReturnType<typeof setIsMyPacksAC>
  | ReturnType<typeof setMinMaxCardsCountAC>
  | ReturnType<typeof changeFiltersAC>
  | ReturnType<typeof resetFiltersAC>
