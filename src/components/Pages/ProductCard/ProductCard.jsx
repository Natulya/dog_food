import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import productCardStyle from './productCard.module.css'
import {
  addToCart,
  deleteFromCart,
  getProducstInCartSelector,
} from '../../../redux/slices/cartSlice'

export function ProductCard({
  pictures, name, price, wight, id,
}) {
//   const {
//     pictures, name, price, description,
//   } = products

  const productsInCart = useSelector(getProducstInCartSelector)

  const dispatch = useDispatch()

  const addToCartHandler = (e) => {
    e.preventDefault()
    dispatch(addToCart(id))
  }

  const deleteFromCartHandler = () => {
    dispatch(deleteFromCart(id))
  }

  const isInCart = (productId) => {
    productsInCart.find((product) => product.id === productId)
  }

  return (
    <Link to={`./${id}`}>
      <div className={productCardStyle.cardWrapper}>
        <div className={productCardStyle.card}>
          <FontAwesomeIcon icon={faHeart} className={productCardStyle.icon} />
          <br />
          <img src={pictures} alt={name} className={productCardStyle.pic} />
          <h5>
            {name}
          </h5>
          <p>{wight}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>
                {price}
                {' '}
                руб
              </b>
            </div>
          </div>
          <button
            type="button"
            className={productCardStyle.btn}
            onClick={isInCart(id) ? deleteFromCartHandler : addToCartHandler}
          >
            В корзину
          </button>
        </div>

      </div>
    </Link>
  )
}
