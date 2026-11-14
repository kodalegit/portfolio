"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./demo-button.module.css";

interface Props {
  src: string;
  title: string;
  className?: string;
  children: ReactNode;
}

/**
 * A button that opens a project's demo video in a modal dialog. The video
 * only loads once the dialog opens, since the files are tens of megabytes.
 */
export function DemoButton({ src, title, className, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {children}
      </button>
      {open &&
        createPortal(
        <dialog
          ref={dialog}
          className={styles.dialog}
          aria-label={`${title} demo`}
          onClose={() => setOpen(false)}
          onClick={(e) => {
            if (e.target === dialog.current) dialog.current.close();
          }}
        >
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2>{title} demo</h2>
              <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close demo">
                <svg viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.8" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
            <video className={styles.video} src={src} controls autoPlay playsInline preload="metadata" />
          </div>
        </dialog>,
          document.body,
        )}
    </>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" />
    </svg>
  );
}
