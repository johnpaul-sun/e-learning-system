/* eslint-disable react-hooks/exhaustive-deps */
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { getAuthUser } from 'redux/auth/authSlice';
import withReactContent from 'sweetalert2-react-content';

import useTimer from './useTimer';
import redirect from 'utils/redirect';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { swalDark } from 'utils/customSwal';
import { useAppDispatch, useAppSelector } from './reduxSelector';

const useIsVerified = () => {
  const token = getCookie('token');
  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);
  const { user: authUser } = useAppSelector((store) => store.auth);
  const { email_verified_at } = authUser || {};

  const [redirectTimer] = useTimer();

  const router: any = useRouter();
  const { user, verified } = router.query;

  let render = false;
  useEffect(() => {
    dispatch(getAuthUser()); 
    if (!token) {
      if (render) { 
        router.push('/login');
        toast.success('Email verified, please proceed to login.'); 
      } render = !render;
    }
    if (!email_verified_at) return;

    MySwal.fire({
      icon: 'success',
      title: 'Email Verified',
      text: 'Thank you for verifying your email address!',
      confirmButtonText: 'Go to Dashboard',
      footer: `<span style="color:#F6F6F6">This page will be automatically redirected to dashboard in <b>3</b>s.</span>`,
      timer: 3000,
      didOpen: () => {
        const b: any = MySwal.getContainer()?.querySelector('b')
        setInterval(() => {
          b.textContent = ((MySwal.getTimerLeft() || 3000 % 60000) / 1000).toFixed(0);
        }, 1000)
      },
      ...swalDark,
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) redirect('/');
      redirect('/');
    });
    
  }, [email_verified_at, user, verified]);

  return [redirectTimer, email_verified_at];
};

export default useIsVerified;
