import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import singUpPageStyle from './singUpPage.module.css'
import { singUpFormValidationSchema } from './validatorSignUp'

const initialValuesSignUp = {
  email: '',
  group: '',
  password: '',
}

export function SignupPage() {
  return (
    <div className={singUpPageStyle.container}>
      <h1>Форма регистрации</h1>
      <Formik
        initialValues={initialValuesSignUp}
        validationSchema={singUpFormValidationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form className="d-flex flex-column">
          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage className="error" component="p" name="email" />

          <Field name="group" placeholder="Код группы" type="text" />
          <ErrorMessage className="error" component="p" name="group" />

          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage className="error" component="p" name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
