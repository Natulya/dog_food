import { Link } from 'react-router-dom'
import headerStyle from './header.module.css'

export function Header() {
  return (
    <div className="d-flex justify-content-between">
      <Link to="/">
        <h1>Header</h1>
      </Link>

      <Link to="/products">
        <h2>Каталог</h2>
      </Link>
      <div>
        <input type="search" placeholder="Введите название" className={headerStyle.searchBar} />
        <button type="button" className="btn btn-secondary mx-2">Поиск</button>
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
