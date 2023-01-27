import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { useQueryContext } from '../../../context/QueryContextProvider'
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
  const { setToken } = useQueryContext()
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values)
      .then((user) => {
        setToken(user.token)
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
