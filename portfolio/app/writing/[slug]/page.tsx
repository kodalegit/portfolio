import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { mdxComponents } from "@/components/mdx-components";
import { Toc } from "@/components/toc";
import { compileArticle } from "@/lib/mdx";
import { formatDate, getAllPosts, getPost, type PostMeta } from "@/lib/posts";
import { projectLinks, site, topics } from "@/lib/site";
import styles from "./article.module.css";
import "@/styles/prose.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.short,
    description: post.result,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.result,
      url: `/writing/${slug}`,
      publishedTime: post.date,
      authors: [site.name],
    },
  };
}

/** Renders `code` spans in short frontmatter strings. */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part,
  );
}

function SetupList({ post }: { post: PostMeta }) {
  return (
    <>
      <dl className={styles.setupList}>
        {post.setup.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      {post.code ? (
        <p className={styles.repo}>
          <a target="_blank" rel="noopener noreferrer" href={`${site.experiments}/${post.code.path}`}>{post.code.label}</a>
          {post.code.note && <span>{post.code.note}</span>}
        </p>
      ) : null}
    </>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = await compileArticle(post.body);
  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length];
  const Findings = post.numbered ? "ol" : "ul";
  const project = post.project ? projectLinks[post.project] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.result,
    datePublished: post.date,
    url: `${site.url}/writing/${slug}`,
    image: `${site.url}/writing/${slug}/opengraph-image`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <main id="main" className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className={styles.grid}>
        <aside className={styles.toc}>
          <Toc items={post.toc} />
        </aside>

        <article className={styles.article}>
          <header className={styles.head}>
            <Link className={styles.back} href="/writing">
              Writing
            </Link>
            <div className={styles.kicker}>
              <span className={styles.topic}>{post.topics.map((t) => topics[t]).join(", ")}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.minutes} minute read</span>
              {project && (
                <span>
                  About <a target="_blank" rel="noopener noreferrer" href={project.href}>{project.name}</a>
                </span>
              )}
            </div>
            <h1>{post.title}</h1>
            <p className={styles.dek}>{post.dek}</p>

            <section className={styles.findings} aria-labelledby="findings-h">
              <h2 id="findings-h">{post.findingsTitle}</h2>
              <Findings>
                {post.findings.map((f) => (
                  <li key={f}>{inline(f)}</li>
                ))}
              </Findings>
              {post.decision && (
                <p className={styles.decision}>
                  <strong>Decision.</strong> {post.decision}
                </p>
              )}
            </section>

            {post.setup.length > 0 && (
              <details className={styles.setupInline}>
                <summary>{post.setupTitle}</summary>
                <SetupList post={post} />
              </details>
            )}
          </header>

          <div className="prose">
            <Content components={mdxComponents} />
          </div>

          {post.code && (
            <aside className={styles.codeCard} aria-label="Code and data">
              <p>
                <strong>Code and data.</strong> {post.code.note}
              </p>
              <a target="_blank" rel="noopener noreferrer" className="btn" href={`${site.experiments}/${post.code.path}`}>
                {post.code.label} on GitHub
              </a>
            </aside>
          )}

          <footer className={styles.end}>
            <div>
              <h2>Written by</h2>
              <p>
                {site.name}, an applied AI engineer in Kenya. I build agents and retrieval systems and measure whether
                they work. <a href={`mailto:${site.email}`}>Email me</a> or <Link href="/">see my work</Link>.
              </p>
            </div>
            {next && next.slug !== slug && (
              <div>
                <h2>Read next</h2>
                <Link className={styles.next} href={`/writing/${next.slug}`}>
                  {next.title}
                </Link>
              </div>
            )}
          </footer>
        </article>

        {post.setup.length > 0 && (
          <aside className={styles.rail} aria-labelledby="setup-h">
            <div className={styles.railBox}>
              <h2 id="setup-h">{post.setupTitle}</h2>
              <SetupList post={post} />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
