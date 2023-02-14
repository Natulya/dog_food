import { useDispatch } from 'react-redux'
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
      <div>
        <h5>{name}</h5>
        <button
          type="button"
          onClick={deleteProductHandler}
          className={cartItemStyle.deleteBtn}
        >
          Удалить

        </button>

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

      <div>
        <p>
          {price}
          {' '}
          руб.
        </p>
        <p>
          {discount}
          {' '}
          %
        </p>
        <p>
          {stock}
          {' '}
          шт
        </p>
      </div>

    </li>
  )
}
