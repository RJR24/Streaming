import React from "react";
import Image from "next/image";

import netflixLogo from "../../assets/image-logo/Netflix-logo.svg";

const SignInSignUpHeader = () => {
  return (
    <div className=" flex justify-center bg-black opacity-80">
    <div className="netflix-logo w-2/3 px-12 py-6">
      <Image src={netflixLogo} alt="netflix logo"></Image>
    </div>
    </div>
  );
};

export default SignInSignUpHeader;
