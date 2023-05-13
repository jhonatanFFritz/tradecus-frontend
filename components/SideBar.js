import { forwardRef, useState, useEffect } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { BsFillCalendarDateFill, BsFillMapFill } from "react-icons/bs";

import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setOpenSubMenu((prevState) => !prevState);
    setActiveLink(index);
  };

  const handleOtherLinkClick = () => {
    setOpenSubMenu(false);
    setActiveLink(null);
  };

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-16 h-auto"
            src="/ferox-transparent.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Panel Principal</p>
            </div>
          </div>
        </Link>
        <Link href="/bookings">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/bookings"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <BsFillCalendarDateFill className="h-5 w-5" />
            </div>
            <div>
              <p>Reservas</p>
            </div>
          </div>
        </Link>
        <Link href="/users">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/users"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Usuarios</p>
            </div>
          </div>
        </Link>
        <Link href="/sales">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/sales"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Ventas</p>
            </div>
          </div>
        </Link>

        <div className="relative">
          <div
            className={` py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/tours"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
            onClick={() => {
              handleLinkClick(4);
              handleOtherLinkClick();
            }}
          >
            <Link href="/tour/tours">
              <div
                className={`pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  router.pathname == "/tours"
                    ? "bg-orange-100 text-orange-500"
                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                }`}
              >
                <div className="mr-2">
                  <BsFillMapFill className="h-5 w-5" />
                </div>
                <div>
                  <p>Tours</p>
                </div>
              </div>
            </Link>
          </div>
          {openSubMenu && activeLink === 4 && (
            <div className="absolute top-full left-0 z-10 w-full bg-white shadow-md border border-gray-200 rounded-b overflow-hidden">
              <Link href="/sales">
                <div
                  className={`pl-10 py-3 flex flex-row mx-5 rounded text-center cursor-pointer transition-colors ${
                    router.pathname == "/tours"
                      ? "bg-orange-100 text-orange-500"
                      : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                  }`}
                >
                  <div className="mr-2">
                    <CreditCardIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p>Ventas</p>
                  </div>
                </div>
              </Link>
              {/*Add other submenu items as needed*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
