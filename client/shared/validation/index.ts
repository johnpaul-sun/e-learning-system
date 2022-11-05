import * as Yup from 'yup';

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required('Password is required'),
});

export const RequestResetLinkFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),  
});

export const ResetPasswordFormSchema = Yup.object().shape({
  token: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(18, 'Password cannot exceed more than 18 characters'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .max(18, 'Password cannot exceed more than 18 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const RegisterFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  last_name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(18, 'Password cannot exceed more than 18 characters'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .max(18, 'Password cannot exceed more than 18 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
