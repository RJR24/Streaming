import React from "react";

import "./hero-styles.css";
import Image from "next/image";

import play from "../../assets/image-logo/Play.svg";
import info from "../../assets/image-logo/info.svg";
import Top10 from "../../assets/image-logo/Top10.svg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-movie-details flex flex-col gap-4 relative top-[9.5rem] left-[3.75rem]">
        <div className="movie-title font-bold text-6xl">Peaky Blinders</div>
        <div className="text-3xl flex align-middle gap-4">
          <Image src={Top10} alt="Top10 sign" width={32} />
          Number 4 in UK Today
        </div>
        <div
          className="text-white
text-[26px]
font-normal
font-['Netflix
Sans']"
        >
          Tommy Shelby, a dangerous man, leads the Peaky Blinders, a gang based
          in Birmingham. Soon, Chester Campbell, an inspector, decides to nab
          him and put an end to the criminal activities.
        </div>
        <div className="play-info flex align-middle gap-4">
          <div
            className="flex bg-white rounded justify-center items-center gap-5 px-[30px] py-4 text-neutral-900 font-medium
font-['Netflix
Sans'] text-[22px]"
          >
            <Image src={play} alt="play sign" width={32} />
            <button className="">Play</button>
          </div>
          <div className=" flex bg-white bg-opacity-30 rounded justify-center items-center gap-5 px-[30px] py-4 text-[22px] font-medium font-['Netflix Sans']">
            <Image src={info} alt="info sign" width={32} />
            <button className="">more information</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
