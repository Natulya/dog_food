import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import headerStyle from './header.module.css'
// import { Search } from '../Search/Search'
import { getUserSelector, setUserInfo, setUserToken } from '../../redux/slices/userSlice'
// import { dogFoodApi } from '../../Api/DogFoodApi'
import { DOG_FOOD_TOKEN_KEY, DOG_FOOD_USER_DATA_KEY } from '../../redux/constants'
import { getProducstInCartSelector } from '../../redux/slices/cartSlice'

export function Header() {
  const {
    token, name, email, id,
  } = useSelector(getUserSelector)
  // const user = useSelector(getUserSelector)
  // console.log(user)
  const productsInCart = useSelector(getProducstInCartSelector)
  const dispatch = useDispatch()

  const userName = name

  console.log('Header Render')

  useEffect(() => {
    localStorage.setItem(DOG_FOOD_TOKEN_KEY, token)
    localStorage.setItem(DOG_FOOD_USER_DATA_KEY, JSON.stringify({ name, email, id }))
  }, [token, name, email, id])

  const logoutHandler = () => {
    dispatch(setUserToken(''))
    dispatch(setUserInfo('', 'user', ''))
  }

  return (
    <div className={headerStyle.wrapper}>
      <Link to="/">
        <div className="d-flex">
          <FontAwesomeIcon icon={faShieldDog} className={headerStyle.iconLogo} />
          <div className={headerStyle.store}>
            <h4>
              DogFood
              {' '}
              <br />
              store
            </h4>

          </div>
        </div>
      </Link>

      <Link to="/products">
        <h3 className={headerStyle.catalog}>Каталог</h3>
      </Link>

      {/* <Search /> */}

      <Link to="/account">
        <div className={headerStyle.cartInfo}>

          <FontAwesomeIcon icon={faCircleUser} className={headerStyle.iconCart} />
          <p>{userName}</p>
        </div>
      </Link>

      <Link to="/favourite">
        <div className={headerStyle.cartInfo}>
          <FontAwesomeIcon icon={faHeart} className={headerStyle.iconCart} />
          <p>Избранное</p>
        </div>
      </Link>

      <div className={headerStyle.leftSide}>
        {token
          ? (
            <Link to="/cart">
              <div className={headerStyle.cartInfo}>
                <p>{productsInCart.length}</p>
                <FontAwesomeIcon icon={faCartShopping} className={headerStyle.iconCart} />
                <p>Корзина</p>
              </div>
            </Link>
          )
          : (
            <Link to="/signup" className="btn btn-primary mx-2">
              Регистрация
            </Link>
          )}

        {token ? (
          <Link onClick={logoutHandler} to="/signin">
            <button type="button" className={headerStyle.btn}>Выйти</button>
          </Link>
        ) : (

          <Link to="/signin">
            <button type="button" className={headerStyle.btn}>Войти</button>
          </Link>
        )}
      </div>

    </div>
  )
}
