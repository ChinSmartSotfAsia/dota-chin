import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="relative flex items-center justify-between h-16 ">
        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
          <div className="hidden sm:ml-5 sm:block">
            <div className="flex space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/favorite"
                className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Favorite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
