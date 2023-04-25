import React from "react";
import { BsRocketTakeoffFill } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="container mx-auto ">
      <div className=" relative flex flex-col lg:flex-row justify-evenly items-center    uppercase tracking-widest text-gray-800 font-extrabold overflow-x-hidden h-screen">
        <div className="order-2 lg:order-1  flex flex-col justify-start items-start bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-sky-800 pt-10 lg:pt-0">
          <span className="text-7xl lg:text-9xl ">Explore</span>
          <div className="text-7xl lg:text-9xl  ">the</div>
          <div className="text-7xl lg:text-9xl ">space</div>
        </div>
        <span className="order-1 lg:order-2   text-7xl scale-[2.0] lg:scale-[3.5] p-5 text-slate-200 bg-gradient-to-br from-teal-200 to-blue-900 rounded-full ">
          <BsRocketTakeoffFill />
        </span>

        <div className="h-[250px] w-[100px] lg:h-[500px] lg:w-[70px] rotate-45 blur-3xl bg-red-500 opacity-0 lg:opacity-80  mix-blend-multiply    absolute top-72 left-64 lg:top-0 lg:left-52" />
        <div className="h-[350px] w-[150px] lg:h-[500px] lg:w-[200px] rotate-45  bg-cyan-400 blur-3xl opacity-30  lg:opacity-30 mix-blend-multiply    absolute top-60 left-60 lg:top-32 lg:left-[450px]" />
        <div className="h-60 w-10  lg:h-80 lg:w-20  rotate-45  bg-gradient-to-b from-[#F20505] via-[#F29F05] to-[#ffffff] animate-pulse blur-lg opacity-80 mix-blend-multiply   absolute top-[130px] right-[330px] lg:top-[320px] lg:right-[365px]" />
      </div>
    </div>
  );
};

export default Banner;
