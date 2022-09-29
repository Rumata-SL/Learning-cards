/* eslint-disable */
import {ThunkType} from '../../../bll/store'
import {setAppStatusAC} from '../../../app/appReducer';
import {packAPI, RequestCardsType} from '../../../api/cards/packAPI';

//initial state
const initialState: PackType = {
  cards: [
    {
      answer: 'no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 2.987525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-05-13T11:05:44.867Z',
      updated: '2020-03-13T11:05:44.867Z',
      _id: '5ebbdfbf48876810f1adk0e7ece3',
    },
    {
      answer: 'no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 3.987525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-05-13T11:05:44.867Z',
      updated: '2020-09-13T11:05:44.867Z',
      _id: '5ebbdf4887681f0f1adk0evf7ece3',
    },
    {
      answer: 'no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 4.457525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-10-13T11:05:44.867Z',
      updated: '2020-10-13T11:05:44.867Z',
      _id: '5ebbgdf4887681g0f1adk0e7ece3',
    },
  ],
  cardsTotalCount: 3,
  maxGrade: 4.987525071790364,
  minGrade: 2.0100984354076568,
  page: 1,
  pageCount: 4,
  packUserId: '6328b5b0da5de300045fa02a',
  // packUserId: '5eecf82a3ed8f700042f1186',
}


//reducer
export const packReducer = (state: PackType = initialState, action: PackActionType): PackType => {
  switch (action.type) {
    case 'pack/SET-PACK':
      return action.pack
    /*case 'pack/DELETE-CARD':
      return {...state, cards: state.cards.filter(el => el._id !== action.cardID)}*/
    default:
      return state
  }
}

//AC
const getPackAC = (pack: PackType) =>
  ({
    type: 'pack/SET-PACK',
    pack
  } as const)

/*const addCardAC = () => {
  return {
    type: 'pack/ADD-CARD',
  } as const
}

const updateCardAC = () => {

}

const deleteCardAC = (cardID: string) => {
  return {
    type: 'pack/DELETE-CARD',
    cardID
  } as const
}*/

//TC
export const getPackTC = (cardsPack_id: string, params: RequestCardsType): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await packAPI.getCards(cardsPack_id, params)
  } catch (e) {
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

//types
type PackType = {
  cards: Array<CardType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

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

export type PackActionType = GetPackACType /*| AddCardACType | DeleteCardACType*/

type GetPackACType = ReturnType<typeof getPackAC>
/*type AddCardACType = ReturnType<typeof addCardAC>
type DeleteCardACType = ReturnType<typeof deleteCardAC>*/
