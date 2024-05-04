import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const Sidebar = ({ activeRoute, setActiveRoute }) => {
  const location = useLocation();
  const [darkmode, setDarkmode] = useState(false);
  return (
    <>
      <div className="">
        <div
          className={`sm:none fixed duration-175 top-0 linear my-auto flex min-h-full flex-col bg-black pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 translate-x-0 
        `}
        >
          <div className={`mx-[56px] mt-[50px] flex items-center`}>
            <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase justify-between items-center flex text-navy-700 dark:text-white">
              <div>ADMIN</div>
              <div
                className="cursor-pointer text-gray-600 ml-5"
                onClick={() => {
                  if (darkmode) {
                    document.body.classList.remove("dark");
                    setDarkmode(false);
                  } else {
                    document.body.classList.add("dark");
                    setDarkmode(true);
                  }
                }}
              >
                {darkmode ? (
                  <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center text-center justify-center">
                    <RiSunLine className="h-4 w-4  text-tblack  dark:text-white" />
                  </div>
                ) : (
                  <div className="bg-gray-200 w-10 h-10 text-tblack rounded-full flex items-center justify-center">
                    <RiMoonFill className="h-4 w-4 text-gray-600 rounded-full dark:text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
          {/* Nav item */}
          <ul className="mb-auto pt-1">
            <div onClick={() => setActiveRoute("dashboard")}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-9"
                >
                  <span
                    className={`${activeRoute === "dashboard"
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    <AiOutlineDashboard />
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${activeRoute === "dashboard"
                      ? "font-bold text-navy-700 dark:bg-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    Bảng điều khiển
                  </p>
                </li>
                {activeRoute === "dashboard" ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </div>
            <div onClick={() => setActiveRoute("addBook")}>
              <div className="relative mb-3 flex cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-9"
                >
                  <span
                    className={`${activeRoute === "addBook"
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    <AiOutlineDashboard />
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${activeRoute === "addBook"
                      ? "font-bold text-navy-700 dark:bg-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    Thêm sách
                  </p>
                </li>
                {activeRoute === "addBook" ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </div>
          </ul>
        </div> </div>
    </>
  );
};

export default Sidebar;
