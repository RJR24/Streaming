import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("x-auth-token");
        if (!token) {
          console.error("Access denied. No token provided.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/usersList",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setUsers(response.data.users);
        console.log("Users from the database:", response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to ensure the effect runs only once
  console.log("users:", users);

  return (
    <div className="bg-white/10 col-span-9 rounded-lg p-6">
      <div className="overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">Users Management</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Users List</h2>
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black/60">
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Group</th>
              <th className="text-left py-3 px-2">Admin</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="py-3 px-2 font-bold">
                    <div className="inline-flex space-x-3 items-center">
                      <span>
                        <img
                          className="rounded-full w-8 h-8"
                          src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                          alt=""
                        ></img>
                      </span>
                      <span>Thai Mei</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{user.name}</td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="py-2 px-4">Approved</td>
                  <td className="py-3 px-2">
                    <div className="inline-flex items-center space-x-3">
                      <a href="" title="Edit" className="hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </a>
                      <a
                        href=""
                        title="Edit password"
                        className="hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </a>
                      <a
                        href=""
                        title="Suspend user"
                        className="hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </a>
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
