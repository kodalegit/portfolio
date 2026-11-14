import Image from "next/image";
import Link from "next/link";

import { baini, projects, reactifyDjango } from "@/lib/projects";
import type { PostMeta } from "@/lib/posts";
import { DemoButton, PlayIcon } from "./demo-button";
import styles from "./projects.module.css";

export function Projects({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <div className={styles.grid}>
        {projects.map((p, i) => {
          const articles = p.writingFor ? posts.filter((post) => post.project === p.writingFor).length : 0;
          return (
            <article key={p.id} className={styles.project} aria-labelledby={`project-${p.id}`}>
              <div className={styles.shot}>
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 72rem) 34rem, (min-width: 44rem) 46vw, 92vw"
                  priority={i < 2}
                />
                {p.demo && (
                  <DemoButton src={p.demo.src} title={p.demo.title} className={styles.play}>
                    <PlayIcon />
                    Play demo
                  </DemoButton>
                )}
              </div>
              <h3 id={`project-${p.id}`}>
                {p.name} <span>{p.when}</span>
              </h3>
              <p>{p.description}</p>
              <div className={styles.stack}>{p.stack}</div>
              <div className={styles.links}>
                {p.links.map((l) => (
                  <a target="_blank" rel="noopener noreferrer" key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
                {articles > 0 && (
                  <Link href="/writing">
                    {articles} {articles === 1 ? "article" : "articles"}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <p className={styles.also}>
        Also: <a target="_blank" rel="noopener noreferrer" href={baini.site}>Baini</a>, which signs images with tamper-evident credentials (
        <DemoButton src={baini.demo.src} title={baini.demo.title} className="link-button">
          demo
        </DemoButton>
        , <a target="_blank" rel="noopener noreferrer" href={baini.source}>source</a>); a member platform for a national pharmaceutical association with
        13,000+ members; an operations platform that saves a client about 8 hours of reconciliation a week; and{" "}
        <a target="_blank" rel="noopener noreferrer" href={reactifyDjango.source}>reactify-django</a>, a CLI <a target="_blank" rel="noopener noreferrer" href={reactifyDjango.npm}>on npm</a> that
        sets up React inside a Django project, with a <a target="_blank" rel="noopener noreferrer" href={reactifyDjango.article}>write-up on Medium</a>.
      </p>
    </>
  );
}
