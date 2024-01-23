import React from "react";
import Image from "next/image";

import GoogleProvider from "./providers/google";
import CredentialsForm from "./credentials/credentials";

export default function Page() {
  return (
    <div className="flex flex-col h-full justify-center items-center bg-gradient-radial from-blue-200 to-blue-300">
      <div className="h-[560px] bg-white w-80 flex flex-col justify-between items-center rounded-xl border shadow-lg p-12">
        <div className="py-8">
          <Image src="/app_logo.jpeg" width={100} height={100} alt="App Logo" />
        </div>
        {/* <div className="w-full py-4">
          <GoogleProvider />
        </div> */}
        <div className="w-full py-4 px-1">
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
}
