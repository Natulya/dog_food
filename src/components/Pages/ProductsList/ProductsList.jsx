import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { getSearchSelector } from '../../../redux/slices/filterSlice'

import { getUserSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { ProductCard } from '../ProductCard/ProductCard'
import productsListStyle from './productsList.module.css'

export function ProductsList() {
  const { token } = useSelector(getUserSelector)
  const search = useSelector(getSearchSelector)
  const navigateProducts = useNavigate()

  useEffect(() => {
    if (!token) {
      navigateProducts('/signup')
    }
  }, [token])

  const {
    data: products, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productListFetch', search],
    queryFn: () => dogFoodApi.getProductsList(search),
    enabled: !!(token),
  })

  if (isLoading) return <Loader />
  if (products === undefined) {
    return <p>Тут undefined</p>
  }
  if (isError) {
    return (
      <div className={productsListStyle.errorMessage}>
        {error.message}
      </div>
    )
  }
  // console.log({ search })

  console.log({
    refetch,
  })

  return (
    <div className={productsListStyle.container}>
      {products.map((item) => (
        <ProductCard
          key={item['_id']}
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
