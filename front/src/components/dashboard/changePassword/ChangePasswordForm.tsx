import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import "./changePassword-style.css";

// import axiosInstance from "../../../utils/axiosConfig";
import SignInSignUpHeader from "../../sIn-sUp-header/SignInSignUpHeader";

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState(""); // State to store the token
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Resetting password with:", values);
        // Call your backend API to handle the password reset logic
        const response = await axios.post(
          "http://localhost:8000/auth/reset-password",
          values
        );

        console.log(response.data);

        // Handle success and navigate to the appropriate page
        handleSuccess();
        router.push("/login"); // Redirect to login page after successful password reset
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSuccess = () => {
    Swal.fire({
      title: "Password Reset Successful!",
      text: "Your password has been successfully reset.",
      icon: "success",
      showConfirmButton: true,
    });
  };

  const handleError = (error) => {
    Swal.fire({
      title: "Oops.",
      text: "Error resetting password. Please try again.",
      icon: "error",
      showConfirmButton: false,
    });
    console.error("Error resetting password:", error);
  };

  return (
    <section className="">
      <SignInSignUpHeader />
      <div className="login flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-black opacity-70 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700">
          <div className="px-12 py-[4.25rem] space-y-4 md:space-y-6 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form
              className=" form-styles space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Enter current password"
                  className="px-4 pt-5 pb-2  rounded-sm w-full outline-none text-sm"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.currentPassword && formik.errors.currentPassword ? (
                  <div className="text-red-500">{formik.errors.currentPassword}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="px-4 pt-5 pb-2 rounded-sm w-full outline-none text-sm"
                  placeholder="Enter new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-red-500">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="px-4 pt-5 pb-2 rounded-sm w-full outline-none text-sm"
                  placeholder="Confirm new password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
