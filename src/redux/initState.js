import { DOG_FOOD_TOKEN_KEY, DOG_FOOD_USER_DATA_KEY } from './constants'

const dataFromLS = localStorage.getItem(DOG_FOOD_USER_DATA_KEY)
const parsedDataFromLS = dataFromLS ? JSON.parse(dataFromLS) : {}

export const initState = {
  user: {
    group: '',
    name: parsedDataFromLS.name || 'user',
    email: parsedDataFromLS.email || '',
    id: parsedDataFromLS.id || '',
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

  /*
cart: {
  product_id: {
    count: 5,
    isChecked: true,
  },
},
*/

}
