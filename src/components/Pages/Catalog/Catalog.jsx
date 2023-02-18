import { Filters } from '../../Filters/Filters'
import { ProductsList } from '../ProductsList/ProductsList'
import { Search } from '../../Search/Search'

export function Catalog() {
  return (
    <>
      <Search />
      <Filters />
      <ProductsList />
    </>
  )
}
