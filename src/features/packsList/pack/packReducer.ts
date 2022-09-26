import { ThunkType } from '../../../bll/store'

//initial state
const initialState = {}

type InitialStateType = typeof initialState

//reducer
export const packReducer = (
  state: InitialStateType = initialState,
  action: PackActionType
): InitialStateType => {
  switch (action.type) {
    case 'pack/your-action':
      return state
    default:
      return state
  }
}

//AC
const packAC = () =>
  ({
    type: 'pack/your-action',
  } as const)

//TC
export const packTC = (): ThunkType => async dispatch => {
  // try {
  // } catch (e) {
  // } finally {
  // }
}

//types
export type PackActionType = ReturnType<typeof packAC>
