import { site } from "@/lib/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className="wrap">
      <div className={styles.footer}>
        <div>
          <strong>{site.name}</strong>
          {site.role}, {site.location}
        </div>
        <div className={styles.links}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a target="_blank" rel="noopener noreferrer" href={site.github}>GitHub</a>
          <a target="_blank" rel="noopener noreferrer" href={site.linkedin}>LinkedIn</a>
          <a target="_blank" rel="noopener noreferrer" href={site.resume}>Résumé</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
