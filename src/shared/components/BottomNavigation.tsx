"use client";

import NavHome from "@/assets/icon/NavHome.svg";
import NavHomeActive from "@/assets/icon/NavHomeActive.svg";
import NavEducation from "@/assets/icon/NavEducation.svg";
import NavEducationActive from "@/assets/icon/NavEducationActive.svg";
import NavHeart from "@/assets/icon/NavHeart.svg";
import NavHeartActive from "@/assets/icon/NavHeartActive.svg";
import NavUser from "@/assets/icon/NavUser.svg";
import NavUserActive from "@/assets/icon/NavUserActive.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BottomNavigation = () => {
  const menus = [
    {
      name: "홈",
      icon: (active: boolean) => (active ? <NavHomeActive /> : <NavHome />),
      path: "/",
    },
    {
      name: "교육",
      icon: (active: boolean) => (active ? <NavEducationActive /> : <NavEducation />),
      path: "/education",
    },
    {
      name: "관심",
      icon: (active: boolean) => (active ? <NavHeartActive /> : <NavHeart />),
      path: "/interest",
    },
    {
      name: "내정보",
      icon: (active: boolean) => (active ? <NavUserActive /> : <NavUser />),
      path: "/my",
    },
  ];

  const path = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const activeMenu = menus
      .filter((menu) => path.startsWith(menu.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    setActiveMenu(activeMenu?.name || null);
  }, [path]);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      const navHeight = nav.offsetHeight;
      document.body.style.paddingBottom = `${navHeight + 10}px`;
    }
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, []);
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-evenly gap-[8px] bg-white py-[12px]">
      {menus.map((menu) => (
        <Link href={menu.path} key={menu.name} className="flex flex-col items-center px-[12px]">
          {menu.icon(menu.name === activeMenu)}
          <span
            className={`${menu.name === activeMenu ? "text-primary" : "text-[#919191]"} text-[20px] font-[400]`}
          >
            {menu.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;
