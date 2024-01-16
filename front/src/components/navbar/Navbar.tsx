import React, { useState } from "react";
import Image from "next/image";
import UserProfileDropdownModal from "./UserProfileDropdownModal";

import "./navbar-styles.css";

import NetflixLogo from "../../assets/image-logo/Netflix-logo.svg";
import search from "../../assets/image-logo/search.svg";
import giftBox from "../../assets/image-logo/giftBox.svg";
import bell from "../../assets/image-logo/bell.svg";
import arrowDown from "../../assets/image-logo/arrowDown.svg";
import profileAvatar from "../../assets/image-logo/ProfileIMG.svg";

const Navbar: React.FC = () => {
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  return (
    <>
      <nav className="px-14 py-6 bg-black text-slate-100 max border-gray-200 ">
        <div className="flex justify-between">
          <div className="container mx-auto flex min-w-0 items-center gap-12">
            <Image src={NetflixLogo} alt="Netflix Logo" />
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className="navbar-left hidden md:block w-full md:w-auto  text-slate-100"
              id="mobile-menu"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium text-slate-100">
                <li>
                  <a
                    href="#"
                    className="bg-blue-700 md:bg-transparent block pl-3 pr-4 py-2 text-gray-500 md:hover:text-gray-400 md:p-0 rounded focus:outline-none"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li className=" hidden">
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="text-gray-600 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                  >
                    Dropdown{" "}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <div
                    id="dropdownNavbar"
                    className="hidden bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44"
                  >
                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
                        >
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <p className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2">
                        Sign out
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    TV Shows
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    Popular
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 whitespace-nowrap hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-400 md:p-0"
                  >
                    My List
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="navbar-right relative flex items-center gap-5"
            onMouseEnter={() => setIsUserDropdownVisible(true)}
            onMouseLeave={() => setIsUserDropdownVisible(false)}
          >
            <div>
              <Image src={search} alt="search" width={20} />
            </div>
            <div>Kids</div>
            <div className=" w-5">
              <Image src={giftBox} alt="gift Box" />
            </div>
            <div className=" w-5">
              <Image src={bell} alt="bell" />
            </div>
            <div className="user-avatar flex items-center gap-2">
              <Image
                src={profileAvatar}
                alt="profile avatar"
                className=" w-8 object-contain"
              />
              <Image
                src={arrowDown}
                alt="arrow Down"
                className=" w-5 object-contain"
              />
              <div className="User-DropdownModal">
                <UserProfileDropdownModal isVisible={isUserDropdownVisible} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></script>
    </>
  );
};

export default Navbar;

// return (
//   <div className="navbar flex justify-between px-14 py-6 bg-black text-slate-100 max-h-md">
//     <div className="flex items-center gap-12 ">
//       <div className="w-32 object-contain flex align-middle">
//         <Image src={NetflixLogo} alt="Netflix Logo" />
//       </div>
//       <div className="navbar-left hidden md:flex gap-5">
//         <div>Home</div>
//         <div>TV Shows</div>
//         <div>Movies</div>
//         <div>New And Popular</div>
//         <div>My List</div>
//       </div>
//     </div>
//     <div
//       className="navbar-right relative flex items-center gap-5"
//       onMouseEnter={() => setIsUserDropdownVisible(true)}
//       onMouseLeave={() => setIsUserDropdownVisible(false)}
//     >
//       <div>
//         <Image src={search} alt="search" width={20} />
//       </div>
//       <div>Kids</div>
//       <div>
//         <Image src={giftBox} alt="gift Box" width={20} />
//       </div>
//       <div>
//         <Image src={bell} alt="bell" width={20} />
//       </div>
//       <div className="user-avatar flex items-center gap-2">
//         <Image
//           src={profileAvatar}
//           alt="profile avatar"
//           className=" w-8 object-contain"
//         />
//         <Image
//           src={arrowDown}
//           alt="arrow Down"
//           className=" w-5 object-contain"
//         />
//         <div className="User-DropdownModal">
//           <UserProfileDropdownModal isVisible={isUserDropdownVisible} />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// <li>
//                 <button
//                   id="dropdownNavbarLink"
//                   data-dropdown-toggle="dropdownNavbar"
//                   className="text-gray-600 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
//                 >
//                   Dropdown{" "}
//                   <svg
//                     className="w-4 h-4 ml-1"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clip-rule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>

//                 <div
//                   id="dropdownNavbar"
//                   className="hidden bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44"
//                 >
//                   <ul className="py-1" aria-labelledby="dropdownLargeButton">
//                     <li>
//                       <a
//                         href="#"
//                         className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
//                       >
//                         Dashboard
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
//                       >
//                         Settings
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
//                       >
//                         Earnings
//                       </a>
//                     </li>
//                   </ul>
//                   <div className="py-1">
//                     <a
//                       href="#"
//                       className="text-sm hover:bg-gray-100 text-gray-600 block px-4 py-2"
//                     >
//                       Sign out
//                     </a>
//                   </div>
//                 </div>
//               </li>
