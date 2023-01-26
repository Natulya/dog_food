import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../../context/QueryContextProvider'
import { Loader } from '../../Loader/Loader'
import { ProductCard } from '../ProductCard/ProductCard'
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

  const { products } = data
  if (!products.length) {
    return <p>Нет ни одного товара</p>
  }

  console.log({
    refetch,
  })

  return (
    <div className={productsListStyle.container}>
      {products.map((item) => (
        <ProductCard
          // eslint-disable-next-line dot-notation
          key={item['_id']}
          pictures={item.pictures}
          name={item.name}
          price={item.price}
          wight={item.wight}
        />
      ))}
    </div>
  )
}
