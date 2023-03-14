import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import productCardStyle from './productCard.module.css'
import {
  addToCart,
  deleteFromCart,
  getProducstInCartSelector,
} from '../../../redux/slices/cartSlice'
import {
  addInFavourites,
  deleteFromFavourites,
  getAllFavouriteProductsSelector,
} from '../../../redux/slices/favouriteSlice'

export function ProductCard({
  pictures, name, price, wight, id,
}) {
//   const {
//     pictures, name, price, description,
//   } = products

  const productsInCart = useSelector(getProducstInCartSelector)
  const favouriteProductsFromState = useSelector(getAllFavouriteProductsSelector)

  const dispatch = useDispatch()

  const addToCartHandler = (e) => {
    e.preventDefault()
    dispatch(addToCart(id))
  }

  const deleteFromCartHandler = (e) => {
    e.preventDefault()
    dispatch(deleteFromCart(id))
  }

  const addInFavouritesHandler = (e) => {
    e.preventDefault()
    dispatch(addInFavourites(id))
  }

  const deleteFromFavouritesHandler = (e) => {
    e.preventDefault()
    dispatch(deleteFromFavourites(id))
  }

  const isInCart = (productId) => productsInCart.find((product) => product.id === productId)

  return (
    <Link to={`./${id}`}>
      <div className={productCardStyle.cardWrapper}>
        <div className={productCardStyle.card}>
          {favouriteProductsFromState.includes(id) && (
          <FontAwesomeIcon
            icon={faHeartCircleCheck}
            className={productCardStyle.icon}
            onClick={deleteFromFavouritesHandler}
          />
          )}
          {!favouriteProductsFromState.includes(id) && (
          <FontAwesomeIcon
            icon={faHeart}
            className={productCardStyle.icon}
            onClick={addInFavouritesHandler}
          />
          )}

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
