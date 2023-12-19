import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import "./changePassword-style.css";

import SignInSignUpHeader from "../../sIn-sUp-header/SignInSignUpHeader";

const ChangeEmail = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newEmail: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Required"),
      newEmail: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Changing email with:", values);
        // Call your backend API to handle the email change logic
        const response = await axios.post(
          "http://localhost:8000/auth/change-email",
          values
        );

        console.log(response.data);

        // Handle success and navigate to the appropriate page
        handleSuccess();
        router.push("/profile"); // Redirect to profile page after successful email change
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSuccess = () => {
    Swal.fire({
      title: "Email Change Successful!",
      text: "Your email has been successfully changed.",
      icon: "success",
      showConfirmButton: true,
    });
  };

  const handleError = (error) => {
    Swal.fire({
      title: "Oops.",
      text: "Error changing email. Please try again.",
      icon: "error",
      showConfirmButton: false,
    });
    console.error("Error changing email:", error);
  };

  return (
    <section className="">
      <SignInSignUpHeader />
      <div className="login flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-black opacity-70 text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700">
          <div className="px-12 py-[4.25rem] space-y-4 md:space-y-6 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl dark:text-white">
              Change Email
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
                  htmlFor="newEmail"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  New Email Address
                </label>
                <input
                  type="text"
                  name="newEmail"
                  id="newEmail"
                  className="px-4 pt-5 pb-2 rounded-sm w-full outline-none text-sm"
                  placeholder="Enter new email address"
                  value={formik.values.newEmail}
                  onChange={formik.handleChange}
                />
                {formik.touched.newEmail && formik.errors.newEmail ? (
                  <div className="text-red-500">{formik.errors.newEmail}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "please check your Email..." : "Send confirmation link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangeEmail;
