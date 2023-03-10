import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { DOG_FOOD_CART_KEY } from '../../../redux/constants'
import { cartInitialize } from '../../../redux/slices/cartSlice'
import { setUserInfo, setUserToken } from '../../../redux/slices/userSlice'

import { withQuery } from '../../HOCs/withQuery'
import signInPageStyle from './signInPage.module.css'
import { signInFormValidationSchema } from './validatorSignIn'

function SignInInner({ mutateAsync, isLoading }) {
  const initialValuesSignIn = {
    email: '',
    password: '',
  }
  const navigateSignIn = useNavigate()
  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => navigateSignIn('/products'))
  }

  return (

    <div className={signInPageStyle.container}>
      <p>Пожалуйста авторизуйтесь</p>
      <Formik
        initialValues={initialValuesSignIn}
        validationSchema={signInFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={signInPageStyle.form}>
          <Field
            name="email"
            placeholder="Email"
            type="email"
            className={signInPageStyle.field}
          />
          <ErrorMessage className={signInPageStyle.error} component="p" name="email" />

          <Field
            name="password"
            placeholder="Пароль"
            type="password"
            className={signInPageStyle.field}
          />
          <ErrorMessage className={signInPageStyle.error} component="p" name="password" />

          <button
            disabled={isLoading}
            type="submit"
            className={signInPageStyle.btn}
          >
            Войти на сайт

          </button>
        </Form>
      </Formik>

    </div>
  )
}

const SignInWithQuery = withQuery(SignInInner)

export function SigninPage() {
  const dispatch = useDispatch()

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({

    mutationFn: (values) => dogFoodApi.signIn(values)
      .then((user) => {
        dispatch(setUserToken(user.token))

        const cartFromLS = window.localStorage.getItem(DOG_FOOD_CART_KEY)
        if (cartFromLS) {
          const cartForCurrentUser = JSON.parse(cartFromLS)[user.data['_id']]
          dispatch(cartInitialize(cartForCurrentUser ?? []))
        }

        dispatch(setUserInfo(user.data['_id'], user.data.name, user.data.email))
      }),
  })

  return (
    <SignInWithQuery
      mutateAsync={mutateAsync}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  )
}
