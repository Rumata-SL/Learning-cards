/* eslint-disable */
import {ThunkType} from '../../../bll/store'
import {setAppStatusAC} from '../../../app/appReducer';
import {CreateCardType, packAPI, RequestCardsType, UpdateCardType} from '../../../api/cards/packAPI';
import {AxiosError} from 'axios';
import {utilsError} from '../../../utils/utils_error';

//initial state
const initialState = {
  cards: [] as Array<CardType>,
  searchData: {
    cardAnswer: 'english',
    cardQuestion: 'english',
    cardsPack_id: '6336d4e907774c00049b21ca',
    min: 0,
    max: 100,
    sortCards: '',
    page: 1,
    pageCount: 10
  },
  packCreated: '2022-09-30T08:07:31.809Z',
  packUpdated: '2022-09-30T08:48:40.312Z',
  packUserId: '6328b5b0da5de300045fa02a',
  packName: 'initial',
  packPrivate: false,
  packDeckCover: null,
  cardsTotalCount: 0,
  token: 'b9e18f40-4097-11ed-a346-336d45d0120e',
  tokenDeathTime: 1664536392116,
  // packUserId: '5eecf82a3ed8f700042f1186',
}


//reducer
export const packReducer = (state: PackType = initialState, action: PackActionType): PackType => {
  switch (action.type) {
    case 'pack/SET-PACK':
      return {...state, cards: action.cards}
    case 'pack/SET-MIN-GRADE':
      return {...state, searchData: {...state.searchData, min: action.min}}
    case 'pack/SET-MAX-GRADE':
      return {...state, searchData: {...state.searchData, max: action.max}}
    case 'pack/SET-USER-ID':
      return {...state, packUserId: action.packUserId}
    case 'pack/SET-PAGE':
      return {...state, searchData: {...state.searchData, page: action.page}}
    case 'pack/SET-PAGE-COUNT':
      return {...state, searchData: {...state.searchData, pageCount: action.pageCount}}
    /*case 'pack/DELETE-CARD':
      return {...state, cards: state.cards.filter(el => el._id !== action.cardID)}*/
    default:
      return state
  }
}

//AC
const setPackAC = (cards: Array<CardType>) => ({type: 'pack/SET-PACK', cards} as const)

const setUserIDAC = (packUserId: string) => ({type: 'pack/SET-USER-ID', packUserId} as const)

const setCardsTotalCountAC = (cardsTotalCount: number) => ({
  type: 'pack/SET-CARDS-TOTAL-COUNT',
  cardsTotalCount
} as const)
const setPageAC = (page: number) => ({type: 'pack/SET-PAGE', page} as const)
const setPageCountAC = (pageCount: number) => ({type: 'pack/SET-PAGE-COUNT', pageCount} as const)

const setMinGradeAC = (min: number) => ({type: 'pack/SET-MIN-GRADE', min} as const)

const setMaxGradeAC = (max: number) => ({type: 'pack/SET-MAX-GRADE', max} as const)


//TC
export const getPackTC = (cardsPack_id: string): ThunkType => async (dispatch, getState) => {
  const params = getState().pack.searchData
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await packAPI.getCards(cardsPack_id, params)
    dispatch(setPackAC(res.data.cards))
    dispatch(setUserIDAC(res.data.packUserId))
    dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
    dispatch(setPageAC(res.data.page))
    dispatch(setPageCountAC(res.data.pageCount))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const createCardTC = (data: CreateCardType): ThunkType => async dispatch => {

  dispatch(setAppStatusAC('loading'))
  try {
    console.log('thunk')
    const res = await packAPI.createCard(data)
    if (res) {
      console.log(res)
      dispatch(getPackTC(data.cardsPack_id))
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const updateCardTC = (cardsPack_id: string, data: UpdateCardType): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await packAPI.updateCard(data)
    if (res) {
      dispatch(getPackTC(cardsPack_id))
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const deleteCardTC = (cardsPack_id: string, _id: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await packAPI.deleteCard(_id)
    if (res) {
      dispatch(getPackTC(cardsPack_id))
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

//types
type PackType = typeof initialState

type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type PackActionType =
  GetPackACType
  | SetMinGradeACType
  | SetMaxGradeACType
  | SetUSerIDACType
  | SetCardsTotalCountACType
  | SetPageACType
  | SetPageCountACType/*| AddCardACType | DeleteCardACType*/

type GetPackACType = ReturnType<typeof setPackAC>
type SetMinGradeACType = ReturnType<typeof setMinGradeAC>
type SetMaxGradeACType = ReturnType<typeof setMaxGradeAC>
type SetUSerIDACType = ReturnType<typeof setUserIDAC>
type SetCardsTotalCountACType = ReturnType<typeof setCardsTotalCountAC>
type SetPageACType = ReturnType<typeof setPageAC>
type SetPageCountACType = ReturnType<typeof setPageCountAC>
/*type AddCardACType = ReturnType<typeof addCardAC>
type DeleteCardACType = ReturnType<typeof deleteCardAC>*/
