import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

type LinkType = {
  label: string;
  href: string;
};

const Navbar = () => {
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
                <Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href={link.href}>
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
