import { deleteCookie, setCookie } from 'cookies-next';

import { axios, setBearerToken } from 'shared/lib/axios';
import { LoginRegisterFormValues } from 'shared/types';

const register = async (user: LoginRegisterFormValues): Promise<any> => {
  const response = await axios.post('/register', user);
  const { token, user: data, message } = response.data;

  if (response.status === 200) {
    setCookie('token', token);
    setBearerToken(token);
  }

  return { data, message };
};

const login = async (user: LoginRegisterFormValues): Promise<any> => {
  const response = await axios.post('/login', user);
  const { token, user: data } = response.data;

  if (response.status === 200) {
    setCookie('token', token);
    setBearerToken(token);
  }

  return data;
};

const logout = async (): Promise<any> => {
  const response = await axios.post('/logout');
  if (response.status === 204) {
    deleteCookie('token');
  }
  return response.data;
};

const resendVerification = async (): Promise<any> => {
  const response = await axios.get('/user/email/resend'); 
  return response.data;
};

const hydrateUserState = async (): Promise<any> => {
  const response = await axios.get('/auth');
  if (response.status === 200) {
    return response.data;
  }
  return 'Something went wrong';
};

const getAuthUser = async (): Promise<any> => {
  const response = await axios.get('/auth');
  return response.data;
};

const authService = {
  login,
  logout,
  register,
  getAuthUser,
  hydrateUserState,
  resendVerification,
};

export default authService;
