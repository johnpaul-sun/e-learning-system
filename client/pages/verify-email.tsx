/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { removeCookies, getCookie } from "cookies-next";

import redirect from "utils/redirect";
import Button from "components/atoms/Button";
import { useAuthMethods } from "hooks/authMethods";

const VerifyEmail = () => {
  const token = getCookie('token');
  const { handleAuthLogout } = useAuthMethods();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [resend, setResend] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setResend(false);
    }
  }, [counter])

  const handleClick = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    setCounter(60);
    setResend(true);

    toast.success("A new verification link has been sent to the email address you provided during registration.",
      { duration: 9000 });

    console.log('resend verification link here');
  };

  const handleLogout = (): void => {
    removeCookies('token');
    handleAuthLogout();
  };

  const router = useRouter();
  const { user, verified } = router.query;

  useEffect(() => {
    if (!token) return redirect('/');
    if (token && verified) {
      setIsVerified(true);
      setCounter(3);
      setTimeout(() => {
        redirect('/');
      }, 3000)
    }
  }, [isVerified, user])

  return (
    <>
      {!token && <></>}
      <div className="bg-els-30 h-screen w-screen min-h-full flex justify-center items-center">
        <div className="bg-els-60 max-w-[420px] w-full rounded-md">
          <div className="bg-els-10 py-3 px-5 flex flex-row justify-between rounded-t-md">
            <img src="/images/logo.png" alt="logo" className="h-[30px] w-[24px]" />
            <span className="text-xl font-semibold text-slate-100">Verify email address</span>
            <div className="h-[30px] w-[24px]" ></div>
          </div>
          <div className="px-5 py-10 flex flex-col gap-10 bg-slate-100 rounded-md">
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-semibold text-slate-800 text-center">
                {isVerified ? 'Thank you for verifying your email address!' : 'Thank you for registering!'}
              </h1>
              {isVerified ||
                <>
                  <p className="text-regular text-slate-800">
                    Please click the link we just sent you to confirm your email address before continuing.
                  </p>
                  <p className="text-regular text-slate-800">
                    We will happily send you another email if you didn't get the first one.
                  </p>
                </>
              }
              {isVerified && <p className='text-els-30 text-12 font-medium text-dark-60'>
                This page will be automatically redirected to dashboard in {counter}s.
              </p>}
            </div>
            <div className="flex gap-3 flex-col">
              {isVerified
                ? <Button onClick={() => redirect('/dashboard')} value="Redirect to Dashboard" />
                : <Button onClick={handleClick} isDisabled={resend} value={resend ? `Resend after ${counter} seconds` : "Resend verification email"} />
              }
              {!isVerified && <Button onClick={handleLogout} value="Logout" className="bg-transparent text-els-30 border-2 border-blue-500 hover:text-els-60 hover:!border-transparent" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
