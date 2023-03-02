import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserSelector } from '../../../redux/slices/userSlice'
import ava from '../../../img/icons8-dog-poo-51.png'
import accountStyle from './account.module.css'

export function Account() {
  const {
    token, name, email, id,
  } = useSelector(getUserSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signup')
    }
  }, [token])

  return (

    <div className={accountStyle.container}>
      <h2>
        Личный кабинет
      </h2>

      <img
        src={ava}
        alt="ava"
        style={{
          width: '51px',
          backgroundColor: 'rgba(179, 3, 88, 0.138)',
          borderRadius: '50%',
        }}
      />
      <p>Фото профиля</p>

      <label htmlFor="name">
        <span>ФИО</span>
        <input className={accountStyle.personalInput} defaultValue={name} type="text" id="name" />
      </label>

      <label htmlFor="email">
        <span>Почта</span>
        <input
          className={accountStyle.personalInput}
          defaultValue={email}
          type="email"
          id="email"
        />
      </label>

      <label htmlFor="id">
        <span>id пользователя</span>
        <input className={accountStyle.personalInput} defaultValue={id} type="text" id="id" />
      </label>
    </div>
  )
}
