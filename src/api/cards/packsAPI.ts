import { AxiosResponse } from 'axios'

import { instance } from '../instance'

export const packsAPI = {
  getPacks(params: PacksRequestType) {
    return instance.get<PacksRequestType, AxiosResponse<CardPacksResponseType>>('/cards/pack', {
      params,
    })
  },
  addPack(name: string, deckCover?: string) {
    return instance.post<AddPackType, AxiosResponse<CardPacksType>>('/cards/pack', {
      cardsPack: {
        name,
        deckCover,
      },
    })
  },
  updatePack(_id: string, name: string) {
    return instance.put<UpdatePackType, AxiosResponse<CardPacksType>>('cards/pack', {
      cardsPack: {
        _id,
        name,
      },
    })
  },
  deletePack(id: string) {
    return instance.delete<'', AxiosResponse<CardPacksType>>('/cards/pack', { params: { id } })
  },
}

//types

export type PacksRequestType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

type CardPacksResponseType = {
  cardPacks: Array<CardPacksType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CardPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

type AddPackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type UpdatePackType = {
  _id: string
  name?: string
  deckCover?: string
  private?: boolean
}
