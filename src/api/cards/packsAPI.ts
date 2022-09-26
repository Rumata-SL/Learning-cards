import { instance } from '../instance'

export const packsAPI = {
  pack() {
    return instance.get('/cards/pack')
  },
}

//types
