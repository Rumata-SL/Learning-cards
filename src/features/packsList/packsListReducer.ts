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
    pageCount: 5,
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
    default:
      return state
  }
}

//AC
const getCardPacksAC = (cardPacks: Array<CardPacksType>) =>
  ({ type: 'packsList/GET_CARD_PACKS', cardPacks } as const)

const packsListAC = () =>
  ({
    type: 'packsList/your-action',
  } as const)

//TC
export const packsListTC = (): ThunkType => async (dispatch, getState) => {
  const { params } = getState().packsList

  dispatch(setAppStatusAC('loading'))

  try {
    const res = await packsAPI.getPacks(params)

    dispatch(getCardPacksAC(res.data.cardPacks))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    utilsError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

//types
export type PacksListActionType = ReturnType<typeof getCardPacksAC>
