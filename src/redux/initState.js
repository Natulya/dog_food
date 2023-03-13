import { DOG_FOOD_CART_KEY, DOG_FOOD_TOKEN_KEY } from './constants'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    id: '',
    token: localStorage.getItem(DOG_FOOD_TOKEN_KEY) || '',
  },

  cart: [
    // {
    //   id: '',
    //   count: 1,
    //   isChecked: false,
    // },
  ],

  filter: {
    search: '',
  },

  favourites: [],

  /*
cart: {
  product_id: {
    count: 5,
    isChecked: true,
  },
},
*/

}

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(DOG_FOOD_CART_KEY)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
