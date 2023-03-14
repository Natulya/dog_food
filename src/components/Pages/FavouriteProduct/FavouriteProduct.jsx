import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addToCart,
  deleteFromCart, getProducstInCartSelector,
} from '../../../redux/slices/cartSlice'
import { deleteFromFavourites } from '../../../redux/slices/favouriteSlice'
import productCardStyle from '../ProductCard/productCard.module.css'

export function FavouriteProduct({
  pictures, name, price, wight, id,
}) {
  const productsInCart = useSelector(getProducstInCartSelector)

  const dispatch = useDispatch()

  const addToCartHandler = (e) => {
    e.preventDefault()
    dispatch(addToCart(id))
  }

  const deleteFromCartHandler = (e) => {
    e.preventDefault()
    dispatch(deleteFromCart(id))
  }

  const deleteFromFavouritesHandler = (e) => {
    e.preventDefault()
    dispatch(deleteFromFavourites(id))
  }

  const isInCart = (productId) => productsInCart.find((product) => product.id === productId)

  return (
    <Link to={`/products/${id}`}>
      <div className={productCardStyle.cardWrapper}>
        <div className={productCardStyle.card}>
          <FontAwesomeIcon
            icon={faHeartCircleCheck}
            className={productCardStyle.icon}
            onClick={deleteFromFavouritesHandler}
          />
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
            className={isInCart(id) ? productCardStyle.btnDelete : productCardStyle.btnAdd}
            onClick={isInCart(id) ? deleteFromCartHandler : addToCartHandler}
          >
            В корзину
          </button>
        </div>

      </div>
    </Link>
  )
}
