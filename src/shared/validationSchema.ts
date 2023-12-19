import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('requireEmailValidation')
    .matches(/^\S+$/, 'spaceEmailValidation')
    .matches(/^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/, 'nameEmailValidation')
    .matches(/@/, 'symbolEmailValidation')
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'domainEmailValidation'
    )
    .email('formatEmailValidation'),
  password: yup
    .string()
    .required('requirePasswordValidation')
    .matches(/[A-ZА-ЯË]/, 'uppercasePasswordValidation')
    .matches(/[a-zа-яё]/, 'lowercasePasswordValidation')
    .matches(/[0-9]/, 'digitPasswordValidation')
    .matches(/[^\wА-Яа-яËё]/, 'characterPasswordValidation')
    .min(8, 'shortPasswordValidation')
    .matches(/^\S+\S+$/, 'spacePasswordValidation'),
  repeatPassword: yup
    .string()
    .required('requireRepeatPasswordValidation')
    .oneOf([yup.ref('password')], 'matchPasswordValidation'),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required('requireEmailValidation')
    .matches(/^\S+$/, 'spaceEmailValidation')
    .matches(/^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/, 'nameEmailValidation')
    .matches(/@/, 'symbolEmailValidation')
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'domainEmailValidation'
    )
    .email('formatEmailValidation'),
  password: yup.string().required('requirePasswordValidation'),
});
