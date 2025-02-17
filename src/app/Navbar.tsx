"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

type LinkType = {
  label: string;
  href: string;
};

const Navbar = () => {
  const currentPath = usePathname();
  const links: LinkType[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links &&
          links.map((link, key) => {
            return (
              <li key={key}>
                <Link
                  className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                  href={link.href}

                  // `${
                  //   link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
                  // } hover:text-zinc-800 transition-colors`
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navbar;
