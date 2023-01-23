import {
  useCallback, useEffect, createContext, useState,
} from 'react'

export const QueryContext = createContext()

const TOKEN_LS_KEY = 'TOKEN_LS_KEY'

export function QueryContextProvider({ children }) {
  const tokenValidation = localStorage.getItem(TOKEN_LS_KEY)
  const [token, setToken] = useState(() => tokenValidation)

  console.log(token)
  useEffect(() => {
    localStorage.setItem(TOKEN_LS_KEY, token)
  }, [token])

  const setNewToken = useCallback((data) => setToken(data), [setToken])

  // const contextValues = useMemo(() => ({ setNewToken }), [token])

  return (
    <QueryContext.Provider value={{ setNewToken }}>
      {children}
    </QueryContext.Provider>
  )
}
