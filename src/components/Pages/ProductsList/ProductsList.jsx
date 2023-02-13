import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'

import { getUserSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { ProductCard } from '../ProductCard/ProductCard'
import productsListStyle from './productsList.module.css'

export function ProductsList() {
  const { token } = useSelector(getUserSelector)
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
    queryFn: () => dogFoodApi.getProductsList(),

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
  if (products === undefined) {
    return <p>Тут undefined</p>
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
          // eslint-disable-next-line dot-notation
          id={item['_id']}
          pictures={item.pictures}
          name={item.name}
          price={item.price}
          wight={item.wight}

        />
      ))}
    </div>
  )
}
