import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import headerStyle from './header.module.css'

export function Header() {
  console.log('Header Render')
  return (
    <div className="d-flex justify-content-between">
      <Link to="/">
        <FontAwesomeIcon icon={faShieldDog} className={headerStyle.icon} />
      </Link>

      <Link to="/products">
        <h2>Каталог</h2>
      </Link>
      <div>
        <input type="search" placeholder="Введите название" className={headerStyle.searchBar} />
        <button type="button" className={headerStyle.btn}>Поиск</button>
      </div>
      <div>
        <Link to="/signup" className="btn btn-primary mx-2">
          Sing-up
        </Link>
        <Link to="/signin" className="btn btn-primary">
          Sing-in
        </Link>
      </div>

    </div>
  )
}
