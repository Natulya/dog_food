import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../../context/QueryContextProvider'
import { Loader } from '../../Loader/Loader'
import productsListStyle from './productsList.module.css'

export function ProductsList() {
  const { token } = useContext(QueryContext)
  const navigateProducts = useNavigate()

  useEffect(() => {
    if (!token) {
      navigateProducts('/signup')
    }
  }, [token])

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productListFetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
    // .then(() => {
    //   throw new Error('Ошибка')
    // }),
  })

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div className={productsListStyle.errorMessage}>
        {error.message}
      </div>
    )
  }

  console.log({
    data, isLoading, isError, error, refetch,
  })

  return (
    <div className={productsListStyle.container}>
      <h1>Здесь карточки товаров</h1>
    </div>
  )
}