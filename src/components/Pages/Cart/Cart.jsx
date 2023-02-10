import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { clearCart, getProducstInCartSelector } from '../../../redux/slices/cartSlice'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { CartItem } from '../CartItem/CartItem'
import cartStyle from './cart.module.css'

export function Cart() {
  const cart = useSelector(getProducstInCartSelector)
  const token = useSelector(getUserSelector)
  const dispatch = useDispatch()
  const {
    data: productsInCart, isLoading, isError, error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id)),
    enabled: (token !== undefined) && (token !== ''),
  })

  console.log(productsInCart)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  return (
    <div className={cartStyle.container}>

      <div className={cartStyle.leftPart}>
        <p> Тут перечень продуктов</p>
        <button type="button" onClick={clearCartHandler}>
          Очистить
        </button>
        <ul>
          {
            productsInCart.map((item) => (
              <CartItem
              // eslint-disable-next-line dot-notation
                key={item['_id']}
              // eslint-disable-next-line dot-notation
                id={item['_id']}
                pictures={item.pictures}
                name={item.name}
                price={item.price}
                wight={item.wight}
              />

            ))
          }
        </ul>
      </div>

      <div className={cartStyle.rightPart}>
        <p> Тут окончательный расчет</p>
      </div>

    </div>
  )
}
