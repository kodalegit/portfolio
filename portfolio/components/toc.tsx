"use client";

import { useEffect, useState } from "react";

import styles from "@/app/writing/[slug]/article.module.css";

/** The article's sections, with the one being read highlighted. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-labelledby="toc-h" className={styles.tocNav}>
      <h2 id="toc-h">On this page</h2>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
