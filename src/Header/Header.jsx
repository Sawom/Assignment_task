import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto">
        {/* nav start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/"> <span className="font-bold" >Home</span> </Link>
              </li>
              <li>
                <Link to="/wishlist"> <span className="font-bold">Wishlist</span> </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="font-bold text-xl">
            Books Gallery
          </Link>
        </div>
        {/* nav center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 gap-10">
            <li>
              <Link to="/"> <span className="font-bold" >Home</span> </Link>
            </li>
            <li>
              <Link to="/wishlist"> <span className="font-bold">Wishlist</span> </Link>
            </li>
          </ul>
        </div>
        {/* nav end */}
        <div className="navbar-end">
          {/* <a className="btn">Button</a> */}
        </div>
      </div>
    </div>
  );
};

export default Header;