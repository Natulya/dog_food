import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { getAllFavouriteProductsSelector } from '../../../redux/slices/favouriteSlice'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import { FavouriteProduct } from '../FavouriteProduct/FavouriteProduct'
import favouritesListStyle from './favouritesList.module.css'
import cartStyle from '../Cart/cart.module.css'

export function FavouriteList() {
  const { token } = useSelector(getUserSelector)
  const favouriteProductsFromState = useSelector(getAllFavouriteProductsSelector)
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signup')
    }
  }, [token])

  const {
    data: favouriteProductsFromApi, isLoading, isError, error,
  } = useQuery({
    queryKey: ['favProductsListFetch', favouriteProductsFromState.length],
    queryFn: () => dogFoodApi.getProductsByIds(favouriteProductsFromState),
    enabled: !!(token),
  })

  if (isLoading) return <Loader />
  if (favouriteProductsFromApi === undefined) {
    return <p>Тут undefined</p>
  }
  if (isError) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  if (!favouriteProductsFromState.length) {
    return (
      <div className={cartStyle.emptyCartWrapper}>
        <p>Вы пока не выбрали любимые продукты</p>
        <div className={cartStyle.linksWrapper}>
          <p>
            Загляните на главную, или в каталог чтобы выбрать понравившиеся товары
          </p>
          <div>
            <Link
              to="/"
              className={cartStyle.link}
            >
              <button type="button">
                <b>На главную</b>
              </button>
            </Link>
            <Link
              to="/products"
              className={cartStyle.link}
            >
              <button type="button">
                <b>В каталог</b>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={favouritesListStyle.container}>
      {favouriteProductsFromApi.map((item) => (
        <FavouriteProduct
          key={item['_id']}
          id={item['_id']}
          pictures={item.pictures}
          name={item.name}
          price={item.price}
          wight={item.wight}
        />
      ))}
    </div>
  )
}
