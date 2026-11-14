"use client";

import styles from "./site-header.module.css";

/**
 * Flips between light and dark. The first visit follows the OS setting
 * through CSS, so this only stores a choice once the reader makes one.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be blocked; the choice still applies to this page */
    }
  };

  return (
    <button type="button" className={styles.theme} onClick={toggle} aria-label="Switch between light and dark theme">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="10" cy="10" r="7.2" />
        <path d="M10 2.8a7.2 7.2 0 0 1 0 14.4z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
