"use client"

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return ( 
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium flex items-center gap-x-2">
        Welcome Back{isLoaded ? ", " : " "}{isLoaded ? user?.firstName : <div className="w-32 h-8 lg:h-10 bg-white/20 animate-pulse rounded-md"/>}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial Overview Report
      </p>
    </div>
   );
}
 