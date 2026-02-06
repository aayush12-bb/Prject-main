import React from "react";
import { User } from "lucide-react";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const cartCount = useSelector((state) => state.cart.count);
    const wishCount = useSelector((state) => state.wish?.count || 0);

  return (
    <div className="container bg-background">

    
    <header className="text-sm fixed top-0 left-0 right-0 z-50 mb-40 bg-background">

      {/* TOP BAR */}
      <div className="container flex flex-col gap-2 px-3 sm:px-3 md:px-12  py-2 text-text md:flex-row md:justify-between md:items-center">

        {/* Contact info */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 md:gap-4 cursor-pointer sm:px-6">
                <CiMail />
                <a href="mailto:prajwaladhikari754@gmail.com">
                  <p>aayushsusling@gmail.com</p>
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlinePhoneInTalk className="cursor-pointer" />
                <a href="tel:+9742938274"> 9808076243 </a>
              </div>
            </div>


        {/* Right actions */}
        <div className="flex items-center gap-8 text-text">

          {/* Language selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium">
              English
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute right-0 mt-2 w-32 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-50">
              <button className="w-full px-4 py-2 text-left hover:text-primary hover:bg-surface rounded-md">
                English
              </button>
              <button className="w-full px-4 py-2 text-left hover:text-primary hover:bg-surface rounded-md">
                नेपाली
              </button>
            </div>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative flex items-center gap-1">
            <span className="hidden md:inline">Wishlist</span>
            <FaRegHeart />
            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 text-xs flex items-center justify-center text-white bg-red-500 rounded-full">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center">
            <BsCart />
             {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 text-xs flex items-center justify-center text-white bg-red-500 rounded-full">
                {cartCount}
              </span>)}
                
          </Link>

          {/* Profile */}
          <div className="flex items-center gap-1 cursor-pointer">
            <User size={18} />
            <span>My Profile</span>
          </div>
        </div>
      </div>

      {/* NAV BAR */}
      <div className="container mx-auto flex items-center justify-between px-3 sm:px-3 md:px-12 h-14">

        <Link to="/" aria-label="Home" className="text-lg font-semibold tracking-wide text-primary">
          SOLE-CRAFTS
        </Link>

        <nav className="hidden md:flex items-center gap-16 text-sm font-medium text-text">
          {["/", "/product", "/contact", "/orders"].map((path, i) => {
            const labels = ["HOME", "SHOP", "CONTACT", "ORDERS"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-primary font-semibold"
                    : "hover:border-b-2 hover:border-primary pb-1"
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </nav>
      </div>

    </header>
    </div>
  );
}

export default Header;
