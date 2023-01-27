import * as Yup from 'yup'

export const signUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Поле Email обязательное'),
  group: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Поле Код группы обязательное'),
  password: Yup.string()
    .min(4, 'Must be 4 characters or more')
    .required('Поле Пароль обязательное'),

})
