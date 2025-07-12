"use client";
import React from "react";

const WelcomeSection = () => {
 return (
  <div className="w-full bg-gradient-to-b rounded-2xl from-blue-50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl">
    <h1 className="text-4xl md:text-4xl font-medium text-gray-800 mb-6">
     Welcome To Wane Facturation
    </h1>
    <p className="text-md md:text-base text-green-600 leading-relaxed max-w-3xl ">
     It is a long established fact that a reader will be distracted by the
     readable content of a page when looking at its layout.
    </p>
   </div>
  </div>
 );
};

export default WelcomeSection;
