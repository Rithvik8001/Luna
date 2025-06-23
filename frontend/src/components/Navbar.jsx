import React from "react";
import { Icon } from "./Icon";

const Navbar = () => {
  return (
    <>
      <div className="h-16">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-full">
          <div className="flex items-center">
            <Icon size={32} color="skyblue" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://github.com/shadcn.png"
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
