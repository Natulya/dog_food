import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import {
  cancelSelectAllProducts, clearCart, getProducstInCartSelector, selectAllProducts,
} from '../../../redux/slices/cartSlice'
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
    queryKey: ['cart', cart.length],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id)),
    enabled: !!(token),
  })

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  console.log(productsInCart)

  const isSelectedAll = !cart.some((prod) => prod.isChecked === false)

  const selectAllHandler = () => {
    if (isSelectedAll) {
      dispatch(cancelSelectAllProducts())
    } else dispatch(selectAllProducts())
  }

  console.log(isSelectedAll)

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  const checkedProducts = cart.filter((prod) => prod.isChecked)

  console.log(checkedProducts)

  let totalCost = 0

  checkedProducts.map((prod) => {
    // eslint-disable-next-line dot-notation
    const checkedProduct = productsInCart.find((el) => prod.id === el['_id'])

    totalCost += checkedProduct.price * (1 - checkedProduct.discount / 100)
    return totalCost
  })

  const getProductStateById = (prodId) => cart.find((prod) => prod.id === prodId)

  if (!cart.length) {
    return (
      <div className={cartStyle.emptyCartWrapper}>
        <p>В корзине пока пусто</p>
        <div className={cartStyle.linksWrapper}>
          <p>
            Загляните на главную, или в каталог чтобы выбрать товары
          </p>
          <div>
            <Link
              to="/"
              className={cartStyle.link}
            >
              <button type="button">
                <b>На главную</b>
              </button>
            </Link>
            <Link
              to="/products"
              className={cartStyle.link}
            >
              <button type="button">
                <b>В каталог</b>
              </button>
            </Link>
          </div>
        </div>
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
                <input
                  id="selectAll"
                  type="checkbox"
                  onChange={selectAllHandler}
                  checked={isSelectedAll}
                />
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
                // eslint-disable-next-line dot-notation
                isChecked={getProductStateById(prod['_id']).isChecked}
                // eslint-disable-next-line dot-notation
                count={getProductStateById(prod['_id']).count}
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
              {totalCost}
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
              {totalCost}
              {' '}
              руб.
            </h5>
          </div>

          <div className={cartStyle.orderContainer}>
            <button type="button" className={cartStyle.btn}>
              Перейти к оформлению
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
