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
  const productsInCartFromState = useSelector(getProducstInCartSelector)
  const token = useSelector(getUserSelector)
  const dispatch = useDispatch()
  const {
    data: productsInCartFromApi, isLoading, isError, error,
  } = useQuery({
    queryKey: ['cart', productsInCartFromState.length],
    queryFn: () => dogFoodApi.getProductsByIds(productsInCartFromState.map(
      (product) => product.id,
    )),
    enabled: !!(token),
    keepPreviousData: true,
  })

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  console.log('productsInCartFromApi', productsInCartFromApi)

  const isSelectedAll = !productsInCartFromState.some((prod) => prod.isChecked === false)

  const selectAllHandler = () => {
    if (isSelectedAll) {
      dispatch(cancelSelectAllProducts())
    } else dispatch(selectAllProducts())
  }

  console.log(isSelectedAll)

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  const checkedProductsFromState = productsInCartFromState.filter((prod) => prod.isChecked)

  console.log('checkedProductsFromState', checkedProductsFromState)

  const getProductStateById = (prodId) => productsInCartFromState.find((prod) => prod.id === prodId)

  const costWithoutDiscount = checkedProductsFromState.reduce((sum, productFromState) => {
    const productFromApi = productsInCartFromApi.find(
      // eslint-disable-next-line dot-notation
      (prodFromApi) => productFromState.id === prodFromApi['_id'],
    )
    const { price } = productFromApi
    const { count } = productFromState

    const productCostWithoutDiscount = price * count

    return sum + productCostWithoutDiscount
  }, 0)

  const sumOfDiscounts = checkedProductsFromState.reduce((sum, productFromState) => {
    const productFromApi = productsInCartFromApi.find(
      // eslint-disable-next-line dot-notation
      (prodFromApi) => productFromState.id === prodFromApi['_id'],
    )
    const { price, discount } = productFromApi
    const { count } = productFromState
    const discountOfProduct = (price - (price * (1 - discount / 100))) * count

    return sum + discountOfProduct
  }, 0)

  const totalCost = checkedProductsFromState.reduce((sum, productFromState) => {
    const productFromApi = productsInCartFromApi.find(
      // eslint-disable-next-line dot-notation
      (prodFromApi) => productFromState.id === prodFromApi['_id'],
    )
    const { price, discount } = productFromApi

    const { count } = productFromState
    const productTotalCost = price * (1 - discount / 100) * count

    return sum + productTotalCost
  }, 0)

  if (!productsInCartFromState.length) {
    return (
      <div className={cartStyle.emptyCartWrapper}>
        <p>?? ?????????????? ???????? ??????????</p>
        <div className={cartStyle.linksWrapper}>
          <p>
            ?????????????????? ???? ??????????????, ?????? ?? ?????????????? ?????????? ?????????????? ????????????
          </p>
          <div>
            <Link
              to="/"
              className={cartStyle.link}
            >
              <button type="button">
                <b>???? ??????????????</b>
              </button>
            </Link>
            <Link
              to="/products"
              className={cartStyle.link}
            >
              <button type="button">
                <b>?? ??????????????</b>
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
        <h5>???????? ??????????????</h5>
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
                ?????????????? ??????
              </label>
            </span>
            <button type="button" onClick={clearCartHandler}>
              ???????????????? ??????????????
            </button>

          </div>

          <ul>

            {
            productsInCartFromApi.map((prod) => (
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
          <h5>?????????????? ????????????</h5>
          <div className={cartStyle.total}>
            <p>
              ??????????:
            </p>
            <p>
              ???????????? (
              {productsInCartFromState.length}
              )
            </p>
          </div>

          <div className={cartStyle.total}>
            <p>
              ??????????:
            </p>
            <p>
              {costWithoutDiscount}
              {' '}
              ??????.
            </p>
          </div>
          <div className={cartStyle.total}>
            <p>
              ????????????:
            </p>
            <p>
              -
              {sumOfDiscounts}
              {' '}
              ??????.
            </p>
          </div>

          <div className={cartStyle.total}>
            <h5>
              ?????????? ??????????????????:
            </h5>
            <h5>
              {totalCost}
              {' '}
              ??????.
            </h5>
          </div>

          <div className={cartStyle.orderContainer}>
            <button type="button" className={cartStyle.btn}>
              ?????????????? ?? ????????????????????
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
