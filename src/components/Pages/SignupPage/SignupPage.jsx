import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import singUpPageStyle from './singUpPage.module.css'
import { singUpFormValidationSchema } from './validatorSignUp'

const initialValuesSignUp = {
  email: '',
  group: '',
  password: '',
}

export function SignupPage() {
  const navigateSingUp = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
  }) // .catch((error) => console.log(error))

  const submitHandler = async (values) => {
    await mutateAsync(values)
    navigateSingUp('/signin')
  }

  return (
    <div className={singUpPageStyle.container}>
      <h3>Форма регистрации</h3>
      <Formik
        initialValues={initialValuesSignUp}
        validationSchema={singUpFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className="d-flex flex-column">
          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage className="error" component="p" name="email" />

          <Field name="group" placeholder="Код группы" type="text" />
          <ErrorMessage className="error" component="p" name="group" />

          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage className="error" component="p" name="password" />

          <button disabled={isLoading} type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  )
}
