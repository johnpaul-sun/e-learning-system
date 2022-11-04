/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";

import Logo from "components/atoms/Logo";
import Button from "components/atoms/Button";
import useRememberMe from "hooks/useRememberMe";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import CopyRights from "components/atoms/CopyRights";
import { RegisterFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";

const Login = () => {
  const {
    isRemembered,
    rememberedEmail,
    onClickRemember,
    onChangeRemember,
  } = useRememberMe();
  const { handleLoginSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  const formikInitialValues = {
    email: "",
    password: ""
  };

  return (
    <>
      <NextHead title="ELS | Register" />
      <main className="flex flex-row bg-els-60 h-full min-h-screen relative overflow-y-auto">
        <Logo/>
        <div className="bg-els-10 w-[60%] p-5 flex justify-center items-center tablet:hidden mobile:hidden">
          <img src="/images/login-img.png" className="max-h-[400px] max-w-[500px]" alt="register" />
        </div>
        <div className="bg-els-30 w-[40%] p-5 tablet:!w-full mobile:!w-full flex flex-col gap-10 justify-center items-center">
          <div className="max-w-[450px] flex flex-col gap-10 w-full py-20 px-10 mobile:px-6">
            <h1 className="text-5xl font-bold text-white text-center mb-5 mobile:text-4xl">Welcome Back</h1>
            <Formik
              initialValues={formikInitialValues}
              validationSchema={RegisterFormSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ isSubmitting }): any => {
                return (
                  <Form>
                    <div className="flex flex-col gap-6 " onChange={onChangeRemember}>
                      <CustomForm
                        label="Email address"
                        name="email"
                        type="email"
                        defaultValue={rememberedEmail}
                        placeholder="john.doe@email.com"
                      />
                      <CustomForm
                        label="Password"
                        name="password"
                        type={isPassHidden ? "password" : "text"}
                        placeholder="●●●●●●●"
                        isPassHidden={isPassHidden}
                        setIsPassHidden={setIsPassHidden}
                      />
                    </div> 
                    <div className="flex justify-between mt-5">
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          defaultChecked={isRemembered}
                          onClick={onClickRemember}
                          className="h-3 w-3 rounded-sm border border-gray-300 bg-transparent"
                        />
                        <label htmlFor="remember" className="ml-2 text-xs text-gray-200">
                          Remember me
                        </label>
                      </div>
                      <Link href="./forgot-password"><h1 className="ml-2 text-xs text-gray-200">Forgot Password?</h1></Link>
                    </div> 
                    <Button isDisabled={isSubmitting} value="Register" className="mt-10" />
                  </Form>
                )
              }}
            </Formik>
            <div className="flex flex-col gap-3 justify-center items-center mobile:mb-10">
              <span className="block text-md font-medium text-slate-300">
                Doesn’t have an account yet?
                <span className="text-els-10 cursor-pointer hover:text-els-10/70 ml-1" >
                  <Link href="./register">Register</Link>
                </span>
              </span>
              <CopyRights />
            </div>
          </div>
        </div>
      </main>
    </>
  );;
};

export default Login;
