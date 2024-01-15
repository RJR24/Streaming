import React from "react";

import Facebook from "../../../public/images-logo/facebook.svg";
import Instagram from "../../../public/images-logo/Instagram.svg";
import Tweeter from "../../../public/images-logo/Tweeter.svg";
import Youtube from "../../../public/images-logo/Youtube01.svg";

const Footer = () => {
  return (
   <div className="footer-container flex justify-center items-center bg-neutral-900">
    <div className=" footer w-full  max-w-fit flex-col h-auto py-6  justify-center items-start gap-5 inline-flex">
      <div className="justify-start cursor-pointer min-w-max items-start gap-5 inline-flex text-zinc-500">
        Questions? Call 1-844-505-2993
      </div>
      <div className="footer-items justify-center items-start gap-5 xl:gap-56 md:gap-14 lg:gap-48 inline-flex">
        <div className="flex-col min-w-fit justify-start items-start gap-3 inline-flex">
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            FAQ
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Investor Relations
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Ways to Watch
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Corporate Information
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Netflix Originals
          </div>
        </div>
        <div className="flex-col min-w-fit justify-start items-start gap-3 inline-flex">
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Help Center
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Jobs
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Terms of Use
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Contact Us
          </div>
        </div>
        <div className="flex-col min-w-fit justify-start items-start gap-3 inline-flex">
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Account
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Redeem Gift Cards
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Privacy
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Speed Test
          </div>
        </div>
        <div className="flex-col min-w-fit justify-start items-start gap-3 inline-flex">
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Media Center
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Buy Gift Cards
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Cookie Preferences
          </div>
          <div className="text-zinc-500 cursor-pointer text-xs font-normal font-['Netflix Sans']">
            Legal Notices
          </div>
        </div>
      </div>
      <div className="px-3 py-2.5 border cursor-pointer text-zinc-500 border-zinc-500 justify-start items-start inline-flex font-['Netflix Sans']  font-normal  text-xs">
        English
      </div>
      <div className="text-zinc-500 text-[11px] font-light font-['Netflix Sans']">
        © 1997-2024 Netflix, Inc.
      </div>
    </div>
   </div> 
  );
};

export default Footer;
