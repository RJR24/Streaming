import React from "react";
import Image from "next/image";

import "./hero-styles.css";
import play from "../../assets/image-logo/Play.svg";
import info from "../../assets/image-logo/info.svg";
import Top10 from "../../assets/image-logo/Top10.svg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-movie-details md:w-[40rem] w-[20rem] flex flex-col gap-8 relative top-[20rem] left-[1.75rem] sm:left-[2.75rem] max-w-[480px]">
        <div className="movie-title font-medium lg:text-[5rem] md:text-[4rem] text-5xl ">Money Heist</div>
        <div className="md:text-3xl text-xl flex align-middle gap-4">
          <Image src={Top10} alt="Top10 sign" width={32} height={32} />
          Number 4 in UK Today
        </div>
        <div className="text-white text-sm md:max-w-md max-w-[17rem] font-normal font-['Netflix Sans']">
          Eight thieves take hostages and lock themselves in the Royal Mint of
          Spain as a criminal mastermind manipulates the police to carry out his
          plan. Tokyo inspired a cast full of city names.
        </div>
        <div className="play-info flex items-center gap-4 mt-4">
          <div className="flex bg-white cursor-pointer rounded bg-opacity-90 hover:bg-opacity-100 justify-center items-center gap-2 md:gap-4 px-2 md:px-6 py-2 md:py-4 text-neutral-900 font-medium font-['Netflix Sans'] text-sm md:text-lg">
            <Image src={play} alt="play sign" width={32} />
            <button>Play</button>
          </div>
          <div className="flex cursor-pointer bg-white bg-opacity-30 hover:bg-opacity-40 rounded justify-center items-center gap-2 md:gap-4 px-2 md:px-6 py-2 md:py-4 text-sm md:text-lg font-medium font-['Netflix Sans']">
            <Image src={info} alt="info sign" width={32} />
            <button>more information</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
