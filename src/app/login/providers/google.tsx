import React from "react";
import Image from "next/image";

export default function GoogleProvider() {
  return (
    <button className="w-full flex flex-row p-2 rounded-md border justify-center">
      <Image src="/google_logo.png" width={20} height={20} alt="Google Logo" />
      <span className="ml-3 text-sm font-semibold">Continue With Google</span>
    </button>
  );
}
