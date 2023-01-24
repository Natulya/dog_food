import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../../context/QueryContextProvider'
import singInPageStyle from './singInPage.module.css'
import { singInFormValidationSchema } from './validatorSignIn'

const initialValuesSignIn = {
  email: '',
  password: '',
}

export function SigninPage() {
  const { token, setNewToken } = useContext(QueryContext)
  const navigateSingIn = useNavigate()

  console.log(token)
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
      .then((user) => {
        setNewToken(user.token)
        navigateSingIn('/products')
      })
      .catch((error) => console.log(error)),

  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
  }

  return (
    <div className={singInPageStyle.container}>
      <p>Пожалуйста авторизуйтесь</p>
      <Formik
        initialValues={initialValuesSignIn}
        validationSchema={singInFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className="d-flex flex-column">
          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage className="error" component="p" name="email" />

          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage className="error" component="p" name="password" />

          <button disabled={isLoading} type="submit">Войти на сайт</button>
        </Form>
      </Formik>

    </div>
  )
}
