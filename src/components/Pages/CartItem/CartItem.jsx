import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  deleteFromCart, productDecrement, productIncrement, selectInCart,
} from '../../../redux/slices/cartSlice'
import cartItemStyle from './cartItem.module.css'
import minus from '../../../img/minus.svg'
import plus from '../../../img/plus.svg'

export function CartItem({
  name, pictures, price, id, stock, discount, count, isChecked,
}) {
  const dispatch = useDispatch()
  // const  = useSelector(getProducstInCartSelector)

  const deleteProductHandler = () => {
    dispatch(deleteFromCart(id))
  }

  const selectProductHandler = () => {
    dispatch(selectInCart(id))
  }

  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement(id)) }
  }
  const decrementCountHandler = () => {
    if (count > 1) { dispatch(productDecrement(id)) }
  }

  return (
    <li className={cartItemStyle.card}>
      <div>
        <input
          type="checkbox"
          onChange={selectProductHandler}
          checked={isChecked}
        />
      </div>
      <img src={pictures} alt={name} className={cartItemStyle.img} />
      <div className={cartItemStyle.name}>
        <h5>{name}</h5>
      </div>

      <div className={cartItemStyle.counter}>
        <button
          type="button"
          onClick={decrementCountHandler}
          disabled={count === 1}
          className={(count === 1)
            ? cartItemStyle.btnChangeAmountDisabled
            : cartItemStyle.btnChangeAmount}
        >
          <img
            src={minus}
            alt="Уменьшить"

          />
        </button>
        <p>{count}</p>
        <button
          type="button"
          onClick={incrementCountHandler}
          disabled={count === stock}
          className={(count === stock)
            ? cartItemStyle.btnChangeAmountDisabled
            : cartItemStyle.btnChangeAmount}
        >
          <img src={plus} alt="Добавить" />
        </button>
      </div>

      <div className={cartItemStyle.cost}>
        <p>
          <b>
            {discount > 0 && `${((price * (100 - discount)) / 100)} руб.`}
            {discount === 0 && `${price} руб.`}
          </b>
        </p>
        <p className={cartItemStyle.beforeDiscount}>
          {discount > 0 && (`${price} руб.`)}
        </p>
        <div className={cartItemStyle.iconsWrapper}>

          <FontAwesomeIcon
            icon={faTrashAlt}
            className={cartItemStyle.iconTrash}
            onClick={deleteProductHandler}
          />

          <FontAwesomeIcon icon={faHeart} className={cartItemStyle.iconHeart} />
        </div>

      </div>

    </li>
  )
}
