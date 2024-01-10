import React from "react";

import "./hero-styles.css";
import Image from "next/image";

import play from "../../assets/image-logo/Play.svg";
import info from "../../assets/image-logo/info.svg";
import Top10 from "../../assets/image-logo/Top10.svg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-movie-details flex flex-col gap-4 relative top-[20rem] left-[2.75rem]">
        <div className="movie-title font-bold text-6xl">Money Heist</div>
        <div className="text-3xl flex align-middle gap-4">
          <Image src={Top10} alt="Top10 sign" width={32} height={32} />
          Number 4 in UK Today
        </div>
        <div
          className="text-white
text-[26px]
font-normal
font-['Netflix
Sans']"
        >
          Eight thieves take hostages and lock themselves in the Royal Mint of
          Spain as a criminal mastermind manipulates the police to carry out his
          plan. Tokyo inspired a cast full of city names.
        </div>
        <div className="play-info flex align-middle gap-4">
          <div
            className="flex bg-white cursor-pointer rounded bg-opacity-90 hover:bg-opacity-100 justify-center items-center gap-5 px-[30px] py-4 text-neutral-900 font-medium
font-['Netflix
Sans'] text-[22px]"
          >
            <Image src={play} alt="play sign" width={32} />
            <button>Play</button>
          </div>
          <div className=" flex cursor-pointer bg-white bg-opacity-30 hover:bg-opacity-40 rounded justify-center items-center gap-5 px-[30px] py-4 text-[22px] font-medium font-['Netflix Sans']">
            <Image src={info} alt="info sign" width={32} />
            <button>more information</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
