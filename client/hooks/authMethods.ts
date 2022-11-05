import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import withReactContent from 'sweetalert2-react-content';

import {
  reset,
  login,
  logout,
  register,
  resetPassword,
  resendVerification,
  requestPasswordResetLink,
} from 'redux/auth/authSlice';
import { useAppDispatch } from 'hooks/reduxSelector';
import { LoginRegisterFormValues } from 'shared/types';
import { swalDark } from 'utils/customSwal';
import redirect from 'utils/redirect';

export const useAuthMethods = () => {
  const MySwal = withReactContent(Swal);
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
      const {
        status,
        content: { email },
      } = payload || {};
      toast.dismiss(creatingAccount);

      if (status >= 400) {
        toast.error(email || 'Something went wrong.\nPlease try again later.');
      } else {
        toast.success('Account created successfully!');
        router.push('/verify-email');
      }
    });
  };

  const handleResendVerification = async (): Promise<void> => {
    dispatch(resendVerification());
    toast.success('Email verification link sent on your Email address', {
      duration: 9000,
    });
  };

  const handleResetPassword = async (data: any): Promise<void> => {
    const accountSetup = toast.loading('Setting up your new password...');
    dispatch(resetPassword(data)).then((res) => {
      const { status } = res.payload;
      const duration = { duration: 9000 };
      toast.dismiss(accountSetup);

      if (status >= 400) {
        return toast.error(
          'Token is invalid or expired.\nPlease request a new reset link.',
          duration
        );
      }

      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You can now log in using your new password that you created!',
        confirmButtonText: 'Go to Dashboard',
        footer: `<span style="color:#F6F6F6">This page will be automatically redirected to login in <b>3</b>s.</span>`,
        timer: 3000,
        didOpen: () => {
          const b: any = MySwal.getContainer()?.querySelector('b');
          setInterval(() => {
            b.textContent = (
              (MySwal.getTimerLeft() || 3000 % 60000) / 1000
            ).toFixed(0);
          }, 1000);
        },
        ...swalDark,
      }).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) redirect('/');
        redirect('/');
      });
    });
  };

  const handleForgotPasswordLink = async (email: string): Promise<void> => {
    const checkingAccount = toast.loading('Checking your account...');
    dispatch(requestPasswordResetLink(email)).then((action) => {
      const { status, message } = action.payload || {};
      const duration = { duration: 6000 };
      toast.dismiss(checkingAccount);

      if (status >= 400)
        return toast.error('We cannot find your email addres.', duration);
      toast.dismiss(checkingAccount);
      if (message === 'Please wait before retrying.') {
      } else {
        toast.success(message, duration);
      }
    });
  };

  return {
    handleAuthLogout,
    handleLoginSubmit,
    handleResetPassword,
    handleRegisterSubmit,
    handleResendVerification,
    handleForgotPasswordLink,
  };
};
