import { useSearchParams } from 'react-router-dom'
import filterItemStyle from './filterItem.module.css'

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()

  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      onClick={() => clickFilterHandler(filterName)}
      className={filterName === currentFilterName ? filterItemStyle.active : ''}
    >
      {filterName}
    </button>
  )
}
