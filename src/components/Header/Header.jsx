import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import headerStyle from './header.module.css'
import { Search } from '../Search/Search'

import { getUserSelector } from '../../redux/slices/userSlice'
import { dogFoodApi } from '../../Api/DogFoodApi'

export function Header() {
  const token = useSelector(getUserSelector)

  console.log('Header Render')

  const logoutHandler = () => {
    dogFoodApi.setToken('')
  }

  return (
    <div className="d-flex justify-content-between">
      <Link to="/">
        <div className="d-flex">
          <FontAwesomeIcon icon={faShieldDog} className={headerStyle.icon} />
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
        <Link to="/signup" className="btn btn-primary mx-2">
          Регистрация
        </Link>
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
