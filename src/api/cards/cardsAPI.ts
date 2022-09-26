import { instance } from '../instance'

export const cardsAPI = {
  card() {
    return instance.get('/cards/card')
  },
}

//types
