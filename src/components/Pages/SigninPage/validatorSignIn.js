import * as Yup from 'yup'

export const signInFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Поле Email обязательное'),

  password: Yup.string()
    .min(4, 'Must be 4 characters or more')
    .required('Поле Пароль обязательное'),

})
