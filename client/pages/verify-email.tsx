/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { removeCookies, getCookie } from "cookies-next";

import useTimer from "hooks/useTimer";
import redirect from "utils/redirect";
import Button from "components/atoms/Button";
import useIsVerified from "hooks/useIsVerified";
import { getAuthUser } from "redux/auth/authSlice";
import { useAuthMethods } from "hooks/authMethods";
import { useAppDispatch } from "hooks/reduxSelector";
import useHydrationBypass from "hooks/useHydrationBypass";
import { useEffect } from "react";
import Loading from "components/templates/Loading/Loading";

const VerifyEmail = () => {
  const token = getCookie('token');
  const dispatch = useAppDispatch();
  const { handleAuthLogout, handleResendVerification } = useAuthMethods();

  const [, email_verified_at] = useIsVerified();
  const [counter, setCounter, isRunning] = useTimer();
  const [resend, setResend] = useState<boolean>(isRunning);

  useEffect(() => {
    setResend(isRunning)
  }, [isRunning])

  const handleClick = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    setCounter(60);
    setResend(true);
    handleResendVerification().then(() => dispatch(getAuthUser()));
  };

  const handleLogout = (): void => {
    removeCookies('token');
    handleAuthLogout();
  };

  const VerificationPage = () => {
    return (
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
                Thank you for registering!
              </h1>
              <p className="text-regular text-slate-800">
                Please click the link we just sent you to confirm your email address before continuing.
              </p>
              <p className="text-regular text-slate-800">
                We will happily send you another email if you didn't get the first one.
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <Button onClick={handleClick} isDisabled={resend || email_verified_at} value={resend ? `Resend after ${counter} seconds` : "Resend verification email"} />
              <Button onClick={handleLogout} value="Logout" className="bg-transparent text-els-30 !border-2 !border-blue-400 hover:text-els-60 hover:!border-transparent" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {useHydrationBypass(!token)}
      {email_verified_at ? <Loading /> : <VerificationPage />}
    </>
  );
};

export { authCheck as getServerSideProps } from 'utils/getServerSideProps'
export default VerifyEmail;
