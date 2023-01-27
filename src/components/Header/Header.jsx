import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import headerStyle from './header.module.css'
import { QueryContext } from '../../context/QueryContextProvider'

export function Header() {
  const { token, setToken } = useContext(QueryContext)
  console.log('Header Render')

  const logoutHandler = () => {
    setToken('')
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
      <div>
        <input type="search" placeholder="Введите название" className={headerStyle.searchBar} />
        <button type="button" className={headerStyle.btn}>Поиск</button>
      </div>
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
