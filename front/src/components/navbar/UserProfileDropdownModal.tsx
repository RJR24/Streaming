import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { isAdmin } from '../../../../src/middlewares/auth';


interface UserDropdownModalProps {
  isVisible: boolean;
}

const UserProfileDropdownModal: React.FC<UserDropdownModalProps> = ({ isVisible }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const authToken = localStorage.getItem("x-auth-token");

        if (!authToken) {
          // Token is not provided, redirect to login
          router.push("/login");
          return;
        }

        // Make a request to get user information, including isAdmin
        const response = await axios.get("http://localhost:8000/profile", {
          headers: {
            "x-auth-token": authToken,
          },
        });

        const user = response.data.data;
        setUserName(user.name);
        setEmail(user.email);
        const userIsAdmin = user.isAdmin;
        setIsAdmin(userIsAdmin);
      } catch (error) {
        console.error("Error checking user role:", error);

        // Token is not valid, redirect to login
        router.push("/login");
      }
    };

    checkUserRole();
  }, [isVisible, router]);

  const handleLogout = async () => {
    try {
      // Show a confirmation message
      const confirmResult = await Swal.fire({
        icon: "question",
        title: "Confirm Logout",
        text: "Are you sure you want to log out?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
      });

      // If the user confirms the logout, proceed with the logout request
      if (confirmResult.isConfirmed) {
        const authToken = localStorage.getItem("x-auth-token");

        // Make a request to logout endpoint
        await axios.post("http://localhost:8000/auth/logout", null, {
          headers: {
            "x-auth-token": authToken,
          },
        });

        // Redirect to login
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="z-10 bg-gray-800 divide-y divide-gray-700 rounded-lg shadow w-44 text-white absolute right-0 mt-2">
      <div className="px-4 py-3 text-sm">
        <div className="font-semibold">Welcome, {userName}</div>
        <div className="font-light truncate">{email}</div>
      </div>
      <ul
        className="py-2 text-sm"
        aria-labelledby="dropdownInformationButton"
      >
        <li>
          <Link
          href="/adminDashboard"
            className="block px-5 py-2 hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/home"
            className=" md:hidden block px-4 py-2 hover:bg-gray-700"
          >
            Home
          </Link>
        </li>
      </ul>
      <div className="py-2">
        <p
          className="block px-4 py-2 text-sm hover:bg-gray-700"
          onClick={handleLogout}
        >
          Sign out
        </p>
      </div>
    </div>
  );
};

export default UserProfileDropdownModal;
