import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import {
  reset,
  login,
  logout,
  register,
  resendVerification,
} from 'redux/auth/authSlice';
import { useAppDispatch } from 'hooks/reduxSelector';
import { LoginRegisterFormValues } from 'shared/types';

export const useAuthMethods = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAuthLogout = async () => {
    dispatch(reset());
    dispatch(logout()).then(() => {
      toast.success('You have successfully signed out');
      router.push('/login');
    });
  };

  const handleLoginSubmit = async (
    data: LoginRegisterFormValues
  ): Promise<void> => {
    dispatch(login(data)).then(({ payload }) => {
      const { content, status } = payload || {};

      if (status) return toast.error(content?.email);
      toast.success('Welcome to dashboard!');
      router.push('/');
    });
  };

  const handleRegisterSubmit = async (
    data: LoginRegisterFormValues
  ): Promise<void> => {
    const creatingAccount = toast.loading('Creating your account...');

    dispatch(register(data)).then(({ payload }) => {
      const { status, message } = payload || {};
      toast.dismiss(creatingAccount);

      if (status) toast.error('Something went wrong.\nPlease try again later.');
      toast.success('Account created successfully!');
      router.push('/verify-email');
    });
  };

  const handleResendVerification = async (): Promise<void> => {
    dispatch(resendVerification());
    toast.success('Email verification link sent on your Email address', {
      duration: 9000,
    });
  };

  return {
    handleAuthLogout,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleResendVerification,
  };
};
