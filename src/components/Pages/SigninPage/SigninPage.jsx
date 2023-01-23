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

const { setNewToken } = useContext(QueryContext)

export function SigninPage() {
  const navigateSingIn = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Typ': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((user) => setNewToken(user.token)),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => { navigateSingIn('/products') })
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
