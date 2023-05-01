import React from "react";
import { BsRocketTakeoffFill } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="container mx-auto ">
      <div className=" relative flex flex-col lg:flex-row justify-evenly items-center bg-gradient-to-br from-yellow-100 to-purple-300    uppercase tracking-widest text-gray-800 font-extrabold overflow-x-hidden  lg:h-screen">
        <div className="order-2 lg:order-1  flex flex-col justify-start items-start bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-sky-800 mt-10 lg:mt-0 py-8 lg:py-0">
          <span className="text-4xl lg:text-9xl ">Explore</span>
          <div className="text-4xl lg:text-9xl  ">the</div>
          <div className="text-4xl lg:text-9xl ">space</div>
        </div>
        <span className="order-1 lg:order-2 text-4xl   lg:text-7xl scale-[2.0] lg:scale-[3.5] p-5 mt-16 lg:mt-0 text-slate-200 bg-gradient-to-br from-teal-200 to-blue-900 rounded-full ">
          <BsRocketTakeoffFill />
        </span>

      
      </div>
    </div>
  );
};

export default Banner;
