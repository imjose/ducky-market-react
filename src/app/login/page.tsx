import Image from "next/image";
import React from "react";

import CredentialsForm from "./credentials/credentials";
import GoogleProvider from "./providers/google";

export default function Login() {
  return (
    <main className="h-full flex flex-col justify-center items-center bg-gradient-radial from-blue-200 to-blue-300">
      <div className="max-w-5xl">
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
    </main>
  );
}
