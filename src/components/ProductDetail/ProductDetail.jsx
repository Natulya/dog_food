import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { addToCart, deleteFromCart, getProducstInCartSelector } from '../../redux/slices/cartSlice'
import { getUserSelector } from '../../redux/slices/userSlice'
import { Loader } from '../Loader/Loader'
import productDetailStyle from './productDetail.module.css'

export function ProductDetail() {
  const { productId } = useParams()
  console.log(productId)

  const productsInCart = useSelector(getProducstInCartSelector)
  const { token } = useSelector(getUserSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signup')
    }
  }, [token])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => dogFoodApi.getProduct(productId),
    enabled: !!(token),
  })

  if (isLoading) return <Loader />
  if (data === undefined) {
    return <p>Тут undefined</p>
  }
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  const addToCartHandler = () => {
    dispatch(addToCart(productId))
  }

  const deleteFromCartHandler = () => {
    dispatch(deleteFromCart(productId))
  }

  const isInCart = (prodId) => {
    productsInCart.find((product) => product.id === prodId)
  }

  return (

    <div className={productDetailStyle.cardWrapper}>
      <div className={productDetailStyle.card}>
        <div>
          <img src={data.pictures} alt={data.name} className={productDetailStyle.pic} />
        </div>
        <div className={productDetailStyle.infoBlock}>
          <h5>
            {data.name}
          </h5>
          <span>Вес товара:</span>
          <b>{data.wight}</b>
          <br />
          <span>В наличии:</span>
          <b>
            {data.stock}
            {' '}
            шт
          </b>
          <br />
          <div className={productDetailStyle.infoBlockInner}>
            <span>Цена:</span>
            <b>
              {data.price}
              {' '}
              руб
            </b>
            <br />
            <button
              type="button"
              className={productDetailStyle.btn}
              onClick={isInCart(productId) ? deleteFromCartHandler : addToCartHandler}
            >
              В корзину
            </button>
            <FontAwesomeIcon icon={faHeart} className={productDetailStyle.icon} />
          </div>

        </div>
      </div>

    </div>

  )
}
