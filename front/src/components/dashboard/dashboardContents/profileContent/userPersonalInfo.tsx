import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IUserFrontend from "./IUserFrontend";

const UserPersonalInfo = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [userPersonalInfo, setUserPersonalInfo] = useState<IUserFrontend>({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: undefined,
    subscriptionStatus: "free",
  });

  const updateUserId = (id: string) => {
    setUserId(id);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("x-auth-token");

    if (!authToken) {
      console.error("Authentication token is missing.");
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/profile", {
          headers: {
            "x-auth-token": authToken,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const storedAvatarUrl = localStorage.getItem(
            `avatarUrl_${userData.data?._id}`
          );

          const userId = userData.data?._id;

          if (userId) {
            setUserId(userId);
          }

          setUserPersonalInfo({
            name: userData.data?.name || "",
            email: userData.data?.email || "",
            phoneNumber: userData.data?.phoneNumber || "",
            dateOfBirth: userData.data?.dateOfBirth || undefined,
            subscriptionStatus: userData.data?.subscriptionStatus || "free",
          });
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [router]);

  const handleEditClick = () => {
    console.log("Edit Clicked");
  };

  return (
    <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
      <div id="24h">
        <h1 className="font-bold py-4 uppercase">Personal Information</h1>
        <div
          id="stats"
          className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-bold">Name:</td>
                <td>{userPersonalInfo.name}</td>
              </tr>
              <tr>
                <td className="font-bold">Email:</td>
                <td>{userPersonalInfo.email}</td>
              </tr>
              <tr>
                <td className="font-bold">Phone Number:</td>
                <td>{userPersonalInfo.phoneNumber || "N/A"}</td>
              </tr>
              {/* Add more rows for other user information */}
            </tbody>
          </table>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEditClick}
          >
            Edit Personal Info
          </button>
        </div>
      </div>
      {/* ... Other sections of the profile content */}
    </div>
  );
};

export default UserPersonalInfo;