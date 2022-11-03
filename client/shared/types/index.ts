export type LoginRegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type SignInUpFormFields =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'password'
  | 'password_confirmation';

export type User = any;
