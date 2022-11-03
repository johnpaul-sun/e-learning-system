import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { LoginRegisterFormValues } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'hooks/reduxSelector';
import { reset, login, logout, register } from 'redux/auth/authSlice';

export const useAuthMethods = () => {
  const { error } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAuthSignOut = async () => {
    dispatch(reset());
    toast.promise(
      dispatch(logout()).then(() => {
        router.push('/');
      }),
      {
        loading: 'Logging out...',
        success: 'You have successfully signed out',
        error: error.content,
      }
    );
  };

  const handleLoginSubmit = async (
    data: LoginRegisterFormValues
  ): Promise<void> => {
    toast.promise(dispatch(login(data)), {
      loading: 'Logging in...',
      success: 'Welcome to dashboard!',
      error: error.content,
    });
  };

  const handleRegisterSubmit = async (
    data: LoginRegisterFormValues
  ): Promise<void> => {
    toast.promise(
      dispatch(register(data)).then(() => {
        router.push('/');
      }),
      {
        loading: 'Creating your account please wait...',
        success: 'Account created successfully!',
        error: error.content,
      }
    );
  };

  return {
    handleAuthSignOut,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
};
