import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import "./login-styles.css";

import axiosInstance from "../../utils/axiosConfig";
import Link from "next/link";
import SignInSignUpHeader from "../sIn-sUp-header/SignInSignUpHeader";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Logging in with:", values);
        const response = await axios.post(
          "http://localhost:8000/auth/login",
          values
        );

        console.log(response.data);

        handleSuccess();
        router.push("/home");
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSuccess = () => {
    Swal.fire({
      title: "Welcome back!",
      text: "You have successfully signed in.",
      icon: "success",
      showConfirmButton: false,
    });
  };

  const handleError = (error) => {
    Swal.fire({
      title: "Oops.",
      text: "Invalid email or password. Please try again.",
      icon: "error",
      showConfirmButton: false,
    });
    console.error("Error submitting login form:", error);
  };

  return (
    <section className="">
      <SignInSignUpHeader />
      <div className="login flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-black opacity-70 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700">
          <div className="px-12 py-[4.25rem] space-y-4 md:space-y-6 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl dark:text-white">
              Sign In
            </h1>
            <form
              className=" form-styles space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                ></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email or phone number"
                  className="px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm"
                  value={formik.values.email} // Use formik.values for value
                  onChange={formik.handleChange} // formik.handleChange for onChange
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white"
                ></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="px-4 pt-5 pb-2 rounded-sm w-full outline-none text-sm"
                  placeholder="Password"
                  value={formik.values.password} //  formik.values for value
                  onChange={formik.handleChange} // formik.handleChange for onChange
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing In..." : "Sign In"}
              </button>
              <a
                href="#"
                className=" flex justify-center text-sm font-light  dark:text-gray-300"
              >
                Forgot password?
              </a>
            </form>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm font-light  dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <p className="text-sm font-light dark:text-gray-400">
              New to Netflix?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-400 hover:underline dark:text-primary-500"
              >
                Sign up now.
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

export default Login;
