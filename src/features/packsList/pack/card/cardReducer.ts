import { ThunkType } from '../../../../bll/store'
/* eslint-disable */
//initial state
const initialState = {}

type InitialStateType = typeof initialState

//reducer
export const cardReducer = (state: InitialStateType = initialState,action: CardActionTypes): InitialStateType => {
  switch (action.type) {
    case 'card/SET-CARDS':
      return state
    default:
      return state
  }
}

//AC
const SetCardsACType = () =>
  ({
    type: 'card/SET-CARDS',
  } as const)

//TC
export const cardTC = (): ThunkType => async dispatch => {
  // try {
  // } catch (e) {
  // } finally {
  // }
}

//types
export type CardActionTypes = SetCardsACType

type SetCardsACType = ReturnType<typeof SetCardsACType>