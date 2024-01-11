import React, { useState } from "react";
import Image from "next/image";
import UserDropdownModal from "./UserDropdownModal";

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
    <div className="  navbar flex justify-between px-14 py-6 bg-black text-slate-100 max-h-md">
      <div className="flex items-center gap-12 ">
        <div className="w-32 object-contain flex align-middle">
          <Image src={NetflixLogo} alt="Netflix Logo" />
        </div>
        <div className="navbar-left hidden md:flex gap-5">
          <div>Home</div>
          <div>TV Shows</div>
          <div>Movies</div>
          <div>New And Popular</div>
          <div>My List</div>
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
        <div>
          <Image src={giftBox} alt="gift Box" width={20} />
        </div>
        <div>
          <Image src={bell} alt="bell" width={20} />
        </div>
        <div className="user-avatar flex items-center gap-2">
          <Image src={profileAvatar} alt="profile avatar"  className=" w-8 object-contain" />
          <Image src={arrowDown} alt="arrow Down" className=" w-5 object-contain" />
          <div className="User-DropdownModal">
            <UserDropdownModal isVisible={isUserDropdownVisible} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
