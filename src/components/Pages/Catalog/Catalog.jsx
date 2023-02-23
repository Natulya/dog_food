import { Filters } from '../../Filters/Filters'
import { ProductsList } from '../ProductsList/ProductsList'
import { Search } from '../../Search/Search'

export function Catalog() {
  return (
    <div style={{ minheight: '600px' }}>
      <Search />
      <Filters />
      <ProductsList />
    </div>
  )
}
