import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import "./signup-styles.css";
import axiosInstance from "../../utils/axiosConfig";
import Link from "next/link";
import SignInSignUpHeader from "../sIn-sUp-header/SignInSignUpHeader";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post("/api/signUp", values);
        console.log(response.data);
        handleSuccess();
        resetForm();
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSuccess = () => {
    Swal.fire({
      title: "Well done",
      text: "Congratulations! Your account has been successfully created.",
      icon: "success",
      showConfirmButton: false,
    });
  };

  const handleError = (error) => {
    Swal.fire({
      title: "Oops.",
      text: "Unfortunately, there was a problem creating your account. Please try again later.",
      icon: "error",
      showConfirmButton: false,
    });
    console.error("Error submitting registration form:", error);
  };

  return (
    <section className=" ">
      <SignInSignUpHeader />

      <div className="signUp-login  flex flex-col items-center justify-center  px-6 py-8 mx-auto ">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className=" bg-black opacity-80 px-16 py-14 space-y-4 md:space-y-6 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email or phone number"
                  className=" px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm placeholder-black::placeholder"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ></label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className="px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="flex items-start"></div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Creating..." : "Create an account"}
              </button>
            </form>
            <p className="text-sm font-light text-gray-700 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-white  text-primary-400 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>
            <p className=" recaptch-info text-xs font-light dark:text-gray-400 ">
              Sign-in is protected by Google reCAPTCHA to ensure you’re not a
              bot.{" "}
              <span
                className="text-primary-400 cursor-pointer hover:underline"
                onClick={() => alert("Learn more clicked")}
              >
                <b className=" text-blue-800">
                  {"<![CDATA[<b>Learn more.</b>]]>"}
                </b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
