import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfilePictureUpload from "./ProfilePictureUpload";

const ProfileContent = () => {
  const router = useRouter();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  const updateUserId = (id: string) => {
    setUserId(id);
  };

  const updateAvatarUrl = (url: string) => {
    setAvatarUrl(url);

    // Check if userId is available before setting local storage
    if (userId) {
      localStorage.setItem(`avatarUrl_${userId}`, url);
    }
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
            `avatarUrl_${userData?._id}`
          );
          setAvatarUrl(storedAvatarUrl || userData.avatar || "");

          // Use _id directly as the user ID
          const userId = userData?._id;
          if (userId) {
            // Pass userId as a prop to ProfilePictureUpload
            setUserId(userId);
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [router]);

  const handleResetPasswordClick = () => {
    // Use router.push to navigate to the ResetPassword page
    router.push("/resetPassword");
  };
  const handleChangeEmailClick = () => {
    // Use router.push to navigate to the ResetPassword page
    router.push("/changeEmail");
  };
  return (
    <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
      <div id="24h">
        <h1 className="font-bold py-4 uppercase">Account Information</h1>
        <div
          id="stats"
          className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-black/60 hover:bg-white/10  to-white/5 p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-indigo-400 font-bold text-xl inline-flex items-center space-x-2">
                  <span>Kaveh Jami</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-black/60 hover:bg-white/10  p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center">
              <div id="stats-1"></div>
              <div>
                <p className="text-indigo-400 font-bold text-xl inline-flex items-center space-x-2">
                  <span>KavehJami@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="last-incomes">
        <h1 className="font-bold py-4 uppercase"></h1>
        <div
          id="stats"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div className="bg-black/60 hover:bg-white/10  to-white/5 rounded-lg">
            <ProfilePictureUpload
              setAvatarUrl={updateAvatarUrl}
              userId={userId}
              updateUserId={updateUserId}
            />
          </div>
          <div className="bg-black/60 hover:bg-white/10 to-white/5 rounded-lg">
            <div className="flex flex-row items-center">
              <div className=" p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 576 512"
                ></svg>
              </div>
              <div className="p-2">
                <p className="text-xl font-bold">Change Email and Password</p>
                {/* <p className="text-gray-500 font-medium">Maia Kipper</p>
                <p className="text-gray-500 text-sm">23 Nov 2022</p> */}
              </div>
            </div>
            <div className="border-t border-white/5 p-4">
              <a href="#" className="flex space-x-2 items-center text-center">
                <span
                  // Handle click to show ResetPassword
                  className="hover:text-indigo-400"
                  onClick={handleResetPasswordClick}
                >
                  password
                </span>

                <span
                  // Handle click to show ResetPassword
                  className="hover:text-indigo-400"
                  onClick={handleChangeEmailClick}
                >
                  email
                </span>
              </a>
            </div>
          </div>

          <div className="bg-black/60 hover:bg-white/10  to-white/5 rounded-lg">
            <div className="flex flex-row items-center">
              <div className=" p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="white"
                    d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l44.9 74.7c-16.1 17.6-28.6 38.5-36.6 61.5c-1.9-1.8-3.5-3.9-4.9-6.3L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-192c-8.8 0-16 7.2-16 16v80c0 8.8 7.2 16 16 16s16-7.2 16-16V288c0-8.8-7.2-16-16-16z"
                  />
                </svg>
              </div>
              <div className="p-2">
                <p className="text-xl font-bold">Personal Information</p>
                <p className="text-gray-500 font-medium">Oprah Milles</p>
                <p className="text-gray-500 text-sm">23 Nov 2022</p>
              </div>
            </div>
            <div className="border-t border-white/5 p-4">
              <a
                href="#"
                className="inline-flex space-x-2 items-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span className="hover:text-indigo-400">click to edit</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="last-users">
        <h1 className="font-bold py-4 uppercase">Last 24h Logins</h1>
        <div className="overflow-x-scroll">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-black/60">
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Group</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </thead>

            <tr key={0} className="border-b hover:bg-white/10 border-gray-700">
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
              <td className="py-3 px-2">thai.mei@abc.com</td>
              <td className="py-3 px-2">User</td>
              <td className="py-3 px-2">Approved</td>
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
                  <a href="" title="Edit password" className="hover:text-white">
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
                  <a href="" title="Suspend user" className="hover:text-white">
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
            <tr key={0} className="border-b hover:bg-white/10 border-gray-700">
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
              <td className="py-3 px-2">thai.mei@abc.com</td>
              <td className="py-3 px-2">User</td>
              <td className="py-3 px-2">Approved</td>
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
                  <a href="" title="Edit password" className="hover:text-white">
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
                  <a href="" title="Suspend user" className="hover:text-white">
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
