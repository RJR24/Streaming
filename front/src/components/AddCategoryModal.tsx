import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';


interface AddCategoryModalProps {
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authToken = localStorage.getItem("x-auth-token");

    try {
      // Make an API call to create a new category
      const response = await axios.post(
        "http://localhost:8000/category",
        formData,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      // Handle success
      Swal.fire({
        icon: "success",
        title: "Category created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      // Handle error
      console.error(
        "Error creating category:",
        error.response ? error.response.data : error.message
      );

      // Display an error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create category. Please try again later.",
      });
    }
  };

  return (
    <>
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center"
      >
        <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>

        <div className="relative p-4 w-full max-w-md max-h-full overflow-y-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Category
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter category title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="slug"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter category slug"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write category description"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new category
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;
