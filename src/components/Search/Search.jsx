import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounse'
import { changeSearchFilter } from '../../redux/slices/filterSlice'
import searchStyle from './search.module.css'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')

    return searchValueFromQuery ?? ''
  })

  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search, 1000)
  console.log({ searchParams })

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      className={searchStyle.searchBar}
      type="text"
      placeholder="Поиск..."
      value={search}
      onChange={changeSearchHandler}
    />
  )
}
