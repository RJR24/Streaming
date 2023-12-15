import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import "./signup-styles.css";
import axiosInstance from "../../utils/axiosConfig";
import Link from "next/link";
import SignInSignUpHeader from "../sIn-sUp-header/SignInSignUpHeader";
import { useRouter } from "next/router";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("onSubmit");

      try {
        const response = await axios.post(
          "http://localhost:8000/auth/signup",
          values
        );
        console.log(response.data);
        handleSuccess();
        resetForm();
        router.push("/login");
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
      showConfirmButton: true,
    });
  };

  const handleError = (error) => {
    let errorMessage =
      "Unfortunately, there was a problem creating your account. Please try again later.";

    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }

    Swal.fire({
      title: "Oops.",
      text: errorMessage,
      icon: "error",
      showConfirmButton: true,
    });

    console.error("Error submitting registration form:", error);
  };

  return (
    <section className=" ">
      <SignInSignUpHeader />

      <div className="signUp flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className=" bg-black opacity-70 px-16 py-14 space-y-4 md:space-y-6 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                ></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className=" px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm placeholder-black::placeholder"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>

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
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>

              <div>
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="terms"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  I accept all terms & conditions.
                </label>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className="text-red-500">{formik.errors.terms}</div>
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
