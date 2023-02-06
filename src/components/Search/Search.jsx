import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../redux/slices/filterSlice'

export function Search() {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value

    setSearch(newSearchValue)

    dispatch(changeSearchFilter(newSearchValue))
  }

  return (
    <input
      placeholder="Search..."
      value={search}
      onChange={changeSearchHandler}
    />
  )
}
