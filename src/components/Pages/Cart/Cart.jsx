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
    enabled: !!(token),
  })

  console.log(productsInCart)

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  // const getProductStateById = (idState) => cart.find((prod) => prod.id === idState)

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
      <div>
        <h5>Ваша корзина</h5>
      </div>

      <div className={cartStyle.cartTab}>
        <div className={cartStyle.leftPart}>
          <div className={cartStyle.upperPanel}>
            <span>
              <label htmlFor="selectAll">
                <input id="selectAll" type="checkbox" defaultChecked />
                {' '}
                Выбрать все
              </label>
            </span>
            <button type="button" onClick={clearCartHandler}>
              Очистить корзину
            </button>

          </div>

          <ul>
            {
            productsInCart.map((prod) => (
              <CartItem
              // eslint-disable-next-line dot-notation
                key={prod['_id']}
              // eslint-disable-next-line dot-notation
                id={prod['_id']}
                pictures={prod.pictures}
                name={prod.name}
                price={prod.price}
                wight={prod.wight}
                stock={prod.stock}
                discount={prod.discount}

                // isChecked={getProductStateById(prod['_id']).isChecked}
                // eslint-disable-next-line dot-notation
                // count={getProductStateById(prod['_id']).count}
              />

            ))
          }
          </ul>
        </div>

        <div className={cartStyle.rightPart}>
          <h5>Условия заказа</h5>
          <div className={cartStyle.total}>
            <p>
              Итого:
            </p>
            <p>
              Товары (
              {cart.length}
              )
            </p>
          </div>

          <div className={cartStyle.total}>
            <p>
              Сумма:
            </p>
            <p>
              000,00
              {' '}
              руб.
            </p>
          </div>
          <div className={cartStyle.total}>
            <p>
              Скидка:
            </p>
            <p>
              -
              000,00
              {' '}
              руб.
            </p>
          </div>

          <div className={cartStyle.total}>
            <h5>
              Общая стоимость:
            </h5>
            <h5>
              000,00
              {' '}
              руб.
            </h5>
          </div>

          <div>
            <button type="button" className={cartStyle.btn}>
              Перейти к оформлению
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
