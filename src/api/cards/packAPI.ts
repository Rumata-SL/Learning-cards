import { AxiosResponse } from 'axios'

import { instance } from '../instance'

export const packAPI = {
  getCards(cardsPack_id: string, params: RequestCardsType) {
    return instance.get<ResponsePackType, AxiosResponse<ResponsePackType>>(
      `/cards/card?cardsPack_id=${cardsPack_id}`,
      { params }
    )
  },
  createCard(data: CreateCardType) {
    return instance.post<{}, AxiosResponse<ResponsePackType>, { card: CreateCardType }>(
      `/cards/card`,
      {
        card: data,
      }
    )
  },
  updateCard(data: UpdateCardType) {
    return instance.put<{}, AxiosResponse<ResponsePackType>, { card: UpdateCardType }>(
      `/cards/card`,
      { card: data }
    )
  },
  deleteCard(_id: string) {
    return instance.delete<'', AxiosResponse<ResponsePackType>>(`/cards/card`, {
      params: { id: _id },
    })
  },
}

//types
export type RequestCardsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

export type ResponsePackType = {
  cards: Array<CardType>
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  packDeckCover: string
  packName: string
  packPrivate: boolean
  token: string
  tokenDeathTime: number
}

export type CreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardType = {
  _id: string
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  comments?: string
}
