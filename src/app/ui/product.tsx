import React from "react";
import { DevicePhoneMobileIcon, ComputerDesktopIcon, UserIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

import { iProduct } from "@/app/lib/definitions";

export default function Product({ title, description, category, children }: Partial<iProduct>) {
  let icon;

  switch (category) {
    case "smartphones":
      icon = <DevicePhoneMobileIcon className="h-6 w-6 text-gray-600" />;
      break;
    case "laptops":
      icon = <ComputerDesktopIcon className="h-6 w-6 text-gray-600" />;
      break;
    case "fragrances":
    case "skincare":
      icon = <UserIcon className="h-6 w-6 text-gray-600" />;
      break;
    case "groceries":
    case "home-decoration":
      icon = <HomeIcon className="h-6 w-6 text-gray-600" />;
      break;
    default:
      icon = <ShoppingBagIcon className="h-6 w-6 text-gray-600" />;
      break;
  }

  return (
    <div className="w-full flex p-2 gap-2">
      <div className="w-12 h-12 flex justify-center items-center flex-shrink-0 bg-slate-200 rounded-xl">{icon}</div>
      <div className="flex flex-row flex-grow justify-between content-center">
        <div className="flex flex-col items-start gap-1">
          <div className="text-ellipsis line-clamp-1"> {title} </div>
          <p className="text-sm text-ellipsis line-clamp-2"> {description} </p>
        </div>
        {children}
      </div>
    </div>
  );
}
