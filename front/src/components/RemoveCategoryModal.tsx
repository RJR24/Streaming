  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';

  interface RemoveCategoryModalProps {
    onClose: (event?: React.MouseEvent) => void;
  }


  interface Category {
    _id: string;
    title: string;
  }

  const RemoveCategoryModal: React.FC<RemoveCategoryModalProps> = ({ onClose }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make an API call to get all categories
          const response = await axios.get('http://localhost:8000/categories');
          setCategories(response.data.data);
        } catch (error) {
          console.error('Error fetching categories:', error.response ? error.response.data : error.message);
          
        }
      };

      fetchData();
    }, []);

    const handleRemove = async () => {
      if (!selectedCategory) {
        // Show a message if no category is selected
        Swal.fire({
          icon: 'warning',
          title: 'No Category Selected',
          text: 'Please select a category to remove.',
        });
        return;
      }
    
      // Show a confirmation message 
      const confirmResult = await Swal.fire({
        icon: 'question',
        title: 'Confirm Removal',
        text: 'Are you sure you want to remove this category?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Cancel',
      });
    
      // If the user confirms the removal, proceed with the delete request
      if (confirmResult.isConfirmed) {
        const authToken = localStorage.getItem('x-auth-token');
    
        try {
          // Make an API call to remove the selected category
          await axios.delete(`http://localhost:8000/category/${selectedCategory}`, {
            headers: {
              'x-auth-token': authToken,
            },
          });
    
          // Handle success
          Swal.fire({
            icon: 'success',
            title: 'Category removed successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
    
          // Close the modal after successful removal
          onClose();
        } catch (error) {
          // Handle error
          console.error(
            'Error removing category:',
            error.response ? error.response.data : error.message
          );
    
          // Display an error message 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to remove category. Please try again later.',
          });
        }
      }
    };
    

    return (
      <>
        {/* Main modal */}
        <div
          id="remove-modal"
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
                  Remove Category
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={(e) => onClose(e)}
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
              <div className="p-4 md:p-5">
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {/* Map through the categories and populate the dropdown */}
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={handleRemove}
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm9-2a1 1 0 011-1h1a1 1 0 010 2h-1a1 1 0 01-1-1zM6 15a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Remove Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default RemoveCategoryModal;
