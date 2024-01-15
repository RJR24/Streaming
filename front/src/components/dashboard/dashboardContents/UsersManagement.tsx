import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  suspended?: boolean;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      const response = await axios.get("http://localhost:8000/api/usersList", {
        headers: {
          "x-auth-token": token,
        },
      });

      setUsers(response.data.users);
      console.log("Users from the database:", response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const suspendUser = (userId: string) => {
    console.log("🚀 ~ suspendUser ~ userId:", userId)
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        users.find((user) => user._id === userId)?.suspended
          ? "Reactivate"
          : "Suspend"
      } the user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (users.find((user) => user._id === userId)?.suspended) {
          confirmReactivate(userId);
        } else {
          confirmSuspension(userId);
        }
      }
    });
  };

  const confirmSuspension = async (userId: string) => {
    if (!userId) {
      console.error("Access denied. No userId provided.");
      return;
    }
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      if (!userId) {
        console.error("Access denied. No userId provided.");
        return;
      }

      console.log("Token:", token);
      console.log("Selected User ID:", userId);

      await axios.post(
        `http://localhost:8000/api/suspendUser/${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      Swal.fire("User Suspended!", "", "success");

      // Refresh the users list after suspending the user
      fetchUsers();
    } catch (error) {
      console.error("Error suspending user:", error);
      Swal.fire("Error", "Failed to suspend user", "error");
    } 
  };

  const confirmReactivate = async (userId: string) => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        console.error("Access denied. No token provided.");
        return;
      }

      await axios.post(
        `http://localhost:8000/api/reactivateUser/${userId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      Swal.fire("User Reactivated!", "", "success");

      // Refresh the users list after Reactivating the user
      fetchUsers();
    } catch (error) {
      console.error("Error Reactivating user:", error);
      Swal.fire("Error", "Failed to reactivate user", "error");
    }
  };

  return (
    <div className="bg-white/10 col-span-9 rounded-lg p-6">
      <div className="overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">Users Management</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Users List</h2>
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black/60">
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Username</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Admin</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        
                      </span>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{user.name}</td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2">
                    {user.isAdmin ? "✅Yes" : "⛔No"}
                  </td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <p title="Edit" className="cursor-pointer hover:text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </p>
                      <button
                        title="Suspend-user"
                        className="hover:text-red-500"
                        onClick={() => suspendUser(user._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke={
                            selectedUserId === user._id ? "red" : "currentColor"
                          }
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
