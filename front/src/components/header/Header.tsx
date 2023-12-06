
// components/header/Header.jsx
import "./header-styles.css"

import Image from 'next/image';
import NetflixLogo from '../../assets/image-logo/Netflix-logo.svg';
import search from '../../assets/image-logo/search.svg';
import giftBox from '../../assets/image-logo/giftBox.svg';
import bell from '../../assets/image-logo/bell.svg';
import arrowDown from '../../assets/image-logo/arrowDown.svg';
import profileImg from '../../assets/image-logo/ProfileIMG.svg';

const Header = () => {
  return (
    <div className="header flex justify-between px-14 py-6 text-slate-100">
      <div className="flex items-center gap-12 ">
        <div className=" w-32 h-16 flex align-middle">
          <Image src={NetflixLogo} alt="Netflix Logo"  />
        </div>
        <div className="header-left flex gap-5">
          <div>Home</div>
          <div>TV Shows</div>
          <div>Movies</div>
          <div>New And Popular</div>
          <div>My List</div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div>
          <Image src={search} alt="search" width={20}  />
        </div>
        <div>Kids</div>
        <div>
          <Image src={giftBox} alt="gift Box" width={20}  />
        </div>
        <div>
          <Image src={bell} alt="bell" width={20} />
        </div>
        <div className="flex items-center gap-2">
          <Image src={profileImg} alt="" width={32} />
          <Image src={arrowDown} alt="" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
