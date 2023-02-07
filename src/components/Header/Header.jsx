import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import headerStyle from './header.module.css'
import { Search } from '../Search/Search'
import { getUserSelector, setUserToken } from '../../redux/slices/userSlice'
// import { dogFoodApi } from '../../Api/DogFoodApi'
import { DOG_FOOD_TOKEN_KEY } from '../../redux/constants'

export function Header() {
  const { token } = useSelector(getUserSelector)
  const dispatch = useDispatch()

  console.log('Header Render')

  useEffect(() => {
    localStorage.setItem(DOG_FOOD_TOKEN_KEY, token)
  }, [token])

  const logoutHandler = () => {
    dispatch(setUserToken(''))
  }

  return (
    <div className="d-flex justify-content-between">
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

      <Search />

      <div>
        {token
          ? (
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className={headerStyle.iconCart} />
            </Link>
          )
          : (
            <Link to="/signup" className="btn btn-primary mx-2">
              Регистрация
            </Link>
          )}

        {token ? (
          <Link onClick={logoutHandler} to="/signin" className="btn btn-primary">
            Выйти
          </Link>
        ) : (

          <Link to="/signin" className="btn btn-primary">
            Войти
          </Link>
        )}
      </div>

    </div>
  )
}
