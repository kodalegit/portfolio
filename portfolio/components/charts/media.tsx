import Image from "next/image";

import styles from "./charts.module.css";

interface ScreenshotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  wide?: boolean;
}

/** A screenshot in an article. Images on the Blob store are optimised by next/image. */
export function Screenshot({ src, alt, width, height, caption, wide }: ScreenshotProps) {
  return (
    <figure className={`${styles.media} ${wide ? "wide" : ""}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 72rem) 56rem, 100vw" />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

interface ClipProps {
  src: string;
  /** A still frame shown before the clip plays. */
  poster?: string;
  /** Describes what the clip shows, for screen readers. */
  label: string;
  caption?: string;
  wide?: boolean;
}

/** A short screen recording. It only downloads when the reader presses play. */
export function Clip({ src, poster, label, caption, wide }: ClipProps) {
  return (
    <figure className={`${styles.media} ${wide ? "wide" : ""}`}>
      <video src={src} poster={poster} controls playsInline preload="none" aria-label={label} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
