import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import productCardStyle from './productCard.module.css'

export function ProductCard({
  pictures, name, price, wight,
}) {
//   const {
//     pictures, name, price, description,
//   } = products

  return (
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
              руб.
            </b>
          </div>
        </div>
        <button type="button" className={productCardStyle.btn}>
          В корзину
        </button>
      </div>

    </div>

  )
}
