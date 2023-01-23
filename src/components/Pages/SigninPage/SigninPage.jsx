import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import singInPageStyle from './singInPage.module.css'
import { singInFormValidationSchema } from './validatorSignIn'

const initialValuesSignIn = {
  email: '',
  password: '',
}

export function SigninPage() {
  return (
    <div className={singInPageStyle.container}>
      <h1>Форма входа</h1>
      <Formik
        initialValues={initialValuesSignIn}
        validationSchema={singInFormValidationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form className="d-flex flex-column">
          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage className="error" component="p" name="email" />

          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage className="error" component="p" name="password" />

          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>

    </div>
  )
}
