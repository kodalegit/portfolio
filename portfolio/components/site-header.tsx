import Link from "next/link";

import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className="wrap">
      <div className={styles.header}>
        <Link className={styles.brand} href="/">
          Victor Kimani
        </Link>
        <div className={styles.right}>
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
