import { DOG_FOOD_TOKEN_KEY } from './constants'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: localStorage.getItem(DOG_FOOD_TOKEN_KEY) || '',
  },

  cart: [
    {
      id: '',
      count: 1,
      isChecked: false,
    },
  ],

  filter: {
    search: '',
  },

  /*
cart: {
  product_id: {
    count: 5,
    isChecked: true,
  },
},
*/

}
