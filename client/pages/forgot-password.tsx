/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCookie, setCookie } from "cookies-next";

import {
  ResetPasswordFormSchema,
  RequestResetLinkFormSchema,
} from "shared/validation";
import Router from "next/router";
import Button from "components/atoms/Button";
import { useAuthMethods } from "hooks/authMethods";
import CustomForm from "components/molecules/CustomForm";
import useHydrationBypass from "hooks/useHydrationBypass";

const ForgotPassword = () => {
  const { state }: any = Router?.router || {};
  const { token, email } = state?.query || {};
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false);
  const { handleForgotPasswordLink, handleResetPassword } = useAuthMethods();

  useEffect(() => {
    setIsLinkClicked((token && email) ? true : false)
  }, [token, email, isLinkClicked])

  const initialEmailValue = getCookie("request_link_to") || getCookie("email") || "";

  const setRequestResetLinkInitialValue = {
    email: initialEmailValue,
  };
  const [requestLinkButton, setRequestLinkButton] = useState<boolean>(false);
  const RequestResetLink = () => {
    return (
      <Formik
        initialValues={setRequestResetLinkInitialValue}
        validationSchema={RequestResetLinkFormSchema}
        onSubmit={async ({ email }: { email: any }) => {
          await handleForgotPasswordLink(email);
          setRequestLinkButton(true)
        }}
      >
        {({ isSubmitting }): any => {
          return (
            <Form onChange={(e: any) => {
              if (e.target.value.length === 0) {
                return setCookie("request_link_to", "");
              } else {
                setCookie("request_link_to", e?.target?.value);
              }
            }} >
              <div className="flex flex-col gap-4" onMouseEnter={() => setRequestLinkButton(false)}>
                <CustomForm
                  label="Email address"
                  isDark={true}
                  name="email"
                  type="email"
                  defaultValue={initialEmailValue.toString()}
                  placeholder="john.doe@email.com"
                />
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  value="Go Back"
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/login");
                  }}
                  className="mt-10 !bg-transparent !text-slate-500 !border-2 !border-blue-400"
                />
                <Button
                  isDisabled={isSubmitting || requestLinkButton}
                  value="Submit"
                  className="mt-10"
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  }

  let setNewPasswordInitialValue = {
    token,
    email,
    password: "",
    password_confirmation: ""
  };
  const SetNewPassword = (
    <Formik
      initialValues={setNewPasswordInitialValue}
      validationSchema={ResetPasswordFormSchema}
      onSubmit={handleResetPassword}
    >
      {({ isSubmitting }): any => {
        return (
          <Form>
            <div className="flex flex-col gap-4">
              <CustomForm
                label="Password"
                isDark={true}
                name="password"
                type={isPassHidden ? "password" : "text"}
                placeholder="●●●●●●●"
                isPassHidden={isPassHidden}
                setIsPassHidden={setIsPassHidden}
              />
              <CustomForm
                label="Confirm Password"
                isDark={true}
                name="password_confirmation"
                type={isPassHidden ? "password" : "text"}
                placeholder="●●●●●●●●"
              />
            </div>
            <div className="flex flex-row gap-3">
              <Button
                value="Go Back"
                onClick={(e) => {
                  e.preventDefault();
                  Router.push("/forgot-password");
                }}
                className="mt-10 !bg-transparent !text-slate-500 !border-2 !border-blue-400"
              />
              <Button isDisabled={isSubmitting} value="Submit" className="mt-10" />
            </div>
          </Form>
        )
      }}
    </Formik>
  );

  return (
    <>
      {useHydrationBypass(isLinkClicked)}
      <div className="bg-els-30 h-screen w-screen min-h-full flex justify-center items-center mobile:p-5">
        <div className="bg-els-60 max-w-[420px] w-full rounded-md">
          <div className="bg-els-10 py-3 px-5 flex flex-row justify-between rounded-t-md">
            <img src="/images/logo.png" alt="logo" className="h-[30px] w-[24px]" />
            <span className="text-xl font-semibold text-slate-100">
              {isLinkClicked ? "Reset password" : "Request reset link"}
            </span>
            <div className="h-[30px] w-[24px]" ></div>
          </div>
          <div className="px-5 py-10 flex flex-col gap-10 bg-slate-100 rounded-md">
            <div className="flex flex-col gap-5">
              {isLinkClicked ? SetNewPassword : <RequestResetLink />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { authCheck as getServerSideProps } from 'utils/getServerSideProps'
export default ForgotPassword;
