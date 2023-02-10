import { useDispatch } from 'react-redux'
import { deleteFromCart } from '../../../redux/slices/cartSlice'
import cartItemStyle from './cartItem.module.css'
import minus from '../../../img/minus.svg'
import plus from '../../../img/plus.svg'

export function CartItem({
  name, pictures, price, id,
}) {
  const dispatch = useDispatch()

  const deleteProductHandler = () => {
    dispatch(deleteFromCart(id))
  }

  return (
    <li className={cartItemStyle.card}>
      <img src={pictures} alt={name} className={cartItemStyle.img} />
      <div>
        <h5>{name}</h5>
        <button type="button" onClick={deleteProductHandler}>Удалить</button>

      </div>

      <div className={cartItemStyle.counter}>
        <button type="button">
          <img src={minus} alt="" className={cartItemStyle.changeAmount} />
        </button>
        <p>1</p>

        <button type="button">
          <img src={plus} alt="" className={cartItemStyle.changeAmount} />
        </button>
      </div>

      <div>
        <p>
          {price}
          {' '}
          руб.
        </p>
      </div>

    </li>
  )
}
