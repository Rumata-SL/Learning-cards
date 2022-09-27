import { instance } from '../instance'

/* eslint-disable */
export const cardsAPI = {
  getCards() {
    return instance.get(`/cards/card`)
  },
  addCard() {
    return instance.post(`/cards/card`)
  },
  updateCard() {
    return instance.put(`/cards/card`)
  },
  deleteCard(cardID: string) {
    return instance.delete<string,CardType>(`/cards/card?id=${cardID}`)
  },
}

//types
type CardType = {

}