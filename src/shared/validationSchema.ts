import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('requareEmailValid')
    .matches(/^\S+$/, 'spaceEmailValid')
    .matches(/^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/, 'nameEmailValid')
    .matches(/@/, 'symbolEmailValid')
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'domainEmailValid'
    )
    .email('formatEmailValid'),
  password: yup
    .string()
    .required('requarePasswordValid')
    .matches(/[A-ZА-ЯË]/, 'uppercasePasswordValid')
    .matches(/[a-zа-яё]/, 'lowercasePasswordValid')
    .matches(/[0-9]/, 'digitPasswordValid')
    .matches(/[^\wА-Яа-яËё]/, 'characterPasswordValid')
    .min(8, 'shortPasswordValid')
    .matches(/^\S+\S+$/, 'spacePasswordValid'),
  repeatPassword: yup
    .string()
    .required('requareRepeatPasswordValid')
    .oneOf([yup.ref('password')], 'matchPasswordValid'),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required('requareEmailValid')
    .matches(/^\S+$/, 'spaceEmailValid')
    .matches(/^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/, 'nameEmailValid')
    .matches(/@/, 'symbolEmailValid')
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'domainEmailValid'
    )
    .email('formatEmailValid'),
  password: yup.string().required('requarePasswordValid'),
});
