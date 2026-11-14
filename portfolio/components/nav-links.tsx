"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./site-header.module.css";

const links = [
  { href: "/writing", label: "Writing", match: "/writing" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={styles.nav}>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={l.match && pathname.startsWith(l.match) ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
