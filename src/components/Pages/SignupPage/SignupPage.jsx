import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { withQuery } from '../../HOCs/withQuery'
import signUpPageStyle from './signUpPage.module.css'
import { signUpFormValidationSchema } from './validatorSignUp'

const initialValuesSignUp = {
  email: '',
  group: 'sm9',
  password: '',
}

function SignUpInner({ mutateAsync, isLoading }) {
  const navigateSignUp = useNavigate()
  const submitHandler = async (values) => {
    await mutateAsync(values)
    navigateSignUp('/signin')
  }

  return (
    <div className={signUpPageStyle.container}>
      <h3>Форма регистрации</h3>
      <Formik
        initialValues={initialValuesSignUp}
        validationSchema={signUpFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={signUpPageStyle.form}>
          <Field
            name="email"
            placeholder="Email"
            type="email"
            className={signUpPageStyle.field}
          />
          <ErrorMessage className={signUpPageStyle.error} component="p" name="email" />

          <Field
            name="group"
            placeholder="Код группы"
            type="text"
            className={signUpPageStyle.field}
          />
          <ErrorMessage className={signUpPageStyle.error} component="p" name="group" />

          <Field
            name="password"
            placeholder="Пароль"
            type="password"
            className={signUpPageStyle.field}
          />
          <ErrorMessage className={signUpPageStyle.error} component="p" name="password" />

          <button
            className={signUpPageStyle.btn}
            disabled={isLoading}
            type="submit"
          >
            Зарегистрироваться
          </button>
        </Form>
      </Formik>
    </div>
  )
}

const SignUpInnerWithQuery = withQuery(SignUpInner)

export function SignupPage() {
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signUp(values).then(),
  })

  return (
    <SignUpInnerWithQuery
      mutateAsync={mutateAsync}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  )
}
