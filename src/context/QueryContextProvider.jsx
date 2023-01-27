import {
  useEffect, createContext, useState, useContext,
} from 'react'
import { dogFoodApi } from '../Api/DogFoodApi'

export const QueryContext = createContext()

const TOKEN_LS_KEY = 'TOKEN_LS_KEY'

export function QueryContextProvider({ children }) {
  const tokenValidation = localStorage.getItem(TOKEN_LS_KEY)
  const [token, setToken] = useState(() => tokenValidation || '')
  console.log(token)
  useEffect(() => {
    localStorage.setItem(TOKEN_LS_KEY, token)
    dogFoodApi.setToken(token)
  }, [token])

  // const contextValues = useMemo(() => ({ token, setNewToken }), [token])

  return (
    <QueryContext.Provider value={{ token, setToken }}>
      {children}
    </QueryContext.Provider>
  )
}

export const useQueryContext = () => useContext(QueryContext)
