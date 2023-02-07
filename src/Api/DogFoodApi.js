import { DOG_FOOD_TOKEN_KEY } from '../redux/constants'

class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  static getToken() {
    return localStorage.getItem(DOG_FOOD_TOKEN_KEY)
  }

  static getAuthorizationHeader() {
    const token = this.getToken()
    if (!token) {
      throw new Error('Отсутствует токен')
    }
    return `Bearer ${token}`
  }
  // setToken(token) {
  //   this.token = token
  //   localStorage.setItem(DOG_FOOD_TOKEN_KEY, '')
  // }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status === 401) {
      throw new Error('Не правильные логин или пароль')
    }
    if (res.status === 404) {
      throw new Error('Пользователь с email не найден')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status} `)
    }
    return res.json()
  }

  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status === 400) {
      throw new Error('Некорректно заполнено одно из полей')
    }

    if (res.status === 409) {
      throw new Error('Юзер с указанным email уже существует')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async getProductsList() {
    const res = await fetch(`${this.baseUrl}/products`, {
      headers: {
        authorization: DogFoodApi.getAuthorizationHeader(),
      },
    })

    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
