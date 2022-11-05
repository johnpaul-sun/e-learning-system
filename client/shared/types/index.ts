export type LoginRegisterFormValues = {
  first_name?: string;
  last_name?: string;
  email: any;
  password: string;
  password_confirmation?: string;
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

export type Cookie = string | boolean | any; 
