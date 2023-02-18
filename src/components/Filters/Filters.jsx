import { useSearchParams } from 'react-router-dom'
import {
  discount, highPrice, lowPrice, newProducts, popular, rating,
} from './constsFilters'
import { FilterItem } from './FilterItem'

const FILTERS = [popular, newProducts, lowPrice, highPrice, rating, discount]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    })
  }

  return (
    <div>
      {FILTERS.map((filterName) => (
        <FilterItem
          key={filterName}
          clickFilterHandler={clickFilterHandler}
          filterName={filterName}
        />
      ))}
    </div>
  )
}
