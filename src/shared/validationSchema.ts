import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('Enter your email')
    .matches(
      /^\S+$/,
      'Email address must not contain leading or trailing whitespace'
    )
    .matches(
      /^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/,
      'Email address must contain correct email'
    )
    .matches(
      /@/,
      'Email address must contain an "@" symbol separating local part and domain name'
    )
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'Email address must contain a domain name (e.g., example.com)'
    )
    .email('Email address must be properly formatted (e.g., user@example.com)'),
  password: yup
    .string()
    .required('Enter password')
    .matches(/[A-ZА-ЯË]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(
      /[^\wА-Яа-яËё]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    )
    .min(8, 'Password too short')
    .matches(
      /^\S+\S+$/,
      'Password must not contain leading or trailing whitespace'
    ),
  repeatPassword: yup
    .string()
    .required('Repeat your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required('Enter your email')
    .matches(
      /^\S+$/,
      'Email address must not contain leading or trailing whitespace'
    )
    .matches(
      /^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/,
      'Email address must contain correct email'
    )
    .matches(
      /@/,
      'Email address must contain an "@" symbol separating local part and domain name'
    )
    .matches(
      /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
      'Email address must contain a domain name (e.g., example.com)'
    )
    .email('Email address must be properly formatted (e.g., user@example.com)'),
  password: yup.string().required('Enter password'),
});
