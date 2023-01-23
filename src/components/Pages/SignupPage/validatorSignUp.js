import * as Yup from 'yup'

export const singUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  group: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required('Required'),

})
