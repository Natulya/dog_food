import { useDispatch } from 'react-redux'
import { deleteFromCart, selectInCart } from '../../../redux/slices/cartSlice'
import cartItemStyle from './cartItem.module.css'
import minus from '../../../img/minus.svg'
import plus from '../../../img/plus.svg'

export function CartItem({
  name, pictures, price, id, stock, discount, count,
}) {
  const dispatch = useDispatch()
  // const  = useSelector(getProducstInCartSelector)

  const deleteProductHandler = () => {
    dispatch(deleteFromCart(id))
  }

  const selectProductHandler = () => {
    dispatch(selectInCart(id))
  }

  return (
    <li className={cartItemStyle.card}>
      <div>
        <input
          type="checkbox"
          onChange={selectProductHandler}
          defaultChecked
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
        <button type="button" className={cartItemStyle.btnChangeAmount}>
          <img src={minus} alt="Уменьшить" />
        </button>
        <p>{count}</p>
        <button type="button" className={cartItemStyle.btnChangeAmount}>
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
