/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import CopyRights from "components/atoms/CopyRights";
import { RegisterFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";

const Register = () => {
  const { handleRegisterSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const formikInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  return (
    <>
      <NextHead title="ELS | Register" />
      <main className="flex flex-row bg-els-60 h-full min-h-screen relative overflow-y-auto">
        <img src="/images/logo.png" alt="logo" className="h-[60px] w-[45px] mobile:h-[36px] mobile:w-[24px] absolute top-6 left-6" />
        <div className="bg-els-10 w-[60%] p-5 flex justify-center items-center tablet:hidden mobile:hidden">
          <img src="/images/register-img.png" className="max-h-[400px] max-w-[500px]" alt="register" />
        </div>
        <div className="bg-els-30 w-[40%] p-5 tablet:!w-full mobile:!w-full flex flex-col gap-10 justify-center items-center">
          <div className="max-w-[450px] flex flex-col gap-10 w-full py-20 px-10 mobile:px-6">
            <h1 className="text-5xl font-bold text-white text-center mb-5">Join us now</h1>
            <Formik
              initialValues={formikInitialValues}
              validationSchema={RegisterFormSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting }): any => {
                return (
                  <Form>
                    <div className="flex flex-col gap-6 ">
                      <div className="flex flex-row gap-5 mobile:flex-col">
                        <CustomForm
                          label="First Name"
                          name="first_name"
                          type="text"
                          placeholder="John"
                        />
                        <CustomForm
                          label="Last Name"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                      <CustomForm
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="john.doe@email.com"
                      />
                      <div className="flex flex-row gap-5 mobile:flex-col">
                        <CustomForm
                          label="Password"
                          name="password"
                          type={isPassHidden ? "password" : "text"}
                          placeholder="●●●●●●●"
                          isPassHidden={isPassHidden}
                          setIsPassHidden={setIsPassHidden}
                        />
                        <CustomForm
                          label="Confirm Password"
                          name="password_confirmation"
                          type={isPassHidden ? "password" : "text"}
                          placeholder="●●●●●●●●"
                        />
                      </div>
                    </div>
                    <Button isDisabled={isSubmitting} value="Register" className="mt-10" />
                  </Form>
                )
              }}
            </Formik>
            <div className="flex flex-col gap-3 justify-center items-center mobile:mb-10">
              <span className="block text-md font-medium text-slate-300">
                Already have an account?
                <span
                  className="text-els-10 cursor-pointer hover:text-els-10/70 ml-1"
                >
                  <Link href="./login">Login</Link>
                </span>
              </span>
              <CopyRights />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
