import { Projects } from "@/components/projects";
import { Trace } from "@/components/trace";
import { WritingList, type ListItem } from "@/components/writing-list";
import { formatDate, getAllPosts } from "@/lib/posts";
import { now, site } from "@/lib/site";
import { kindLabels, layoutTrace } from "@/lib/work";
import styles from "./home.module.css";

/** Rebuild daily so the trace's "now" line and durations stay current. */
export const revalidate = 86400;

export default function Home() {
  const posts = getAllPosts();
  const items: ListItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    dek: p.dek,
    date: p.date,
    dateLabel: formatDate(p.date, "short"),
    topics: p.topics,
    metric: p.metric,
  }));
  const shortTitles = Object.fromEntries(posts.map((p) => [p.slug, p.short]));
  const layout = layoutTrace(new Date());

  return (
    <main id="main" className="wrap">
      <section className={styles.hero} aria-labelledby="name">
        <div>
          <h1 id="name" className={styles.name}>
            {site.name}
          </h1>
          <p className={styles.lede}>
            Applied AI engineer in Kenya. I build agents, retrieval systems and the evaluations that show whether
            they work, and I take them from architecture to production.
          </p>
          <p className={styles.sub}>Trained as a civil engineer. Open to applied AI, full-stack and backend engineering roles.</p>
          <div className={styles.actions}>
            <a className="btn btn-primary" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a target="_blank" rel="noopener noreferrer" className="btn" href={site.resume}>
              Résumé (PDF)
            </a>
            <a target="_blank" rel="noopener noreferrer" className="btn" href={site.github}>
              GitHub
            </a>
            <a target="_blank" rel="noopener noreferrer" className="btn" href={site.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>
        <aside className={styles.now} aria-labelledby="now">
          <h2 id="now">
            What I’m doing now
          </h2>
          <ul>
            {now.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="sec" id="work" aria-labelledby="work-h">
        <div className="sec-head">
          <div>
            <h2 id="work-h">Where I’ve worked</h2>
            <p>Drawn like an agent trace: overlapping spans over time. Select one to see what I built.</p>
          </div>
          <div className="legend" aria-label="Legend">
            {Object.entries(kindLabels).map(([k, label]) => (
              <span key={k}>
                <i className={`key c-${k}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <Trace layout={layout} articles={shortTitles} />
      </section>

      <section className="sec" id="writing" aria-labelledby="writing-h">
        <div className="sec-head">
          <div>
            <h2 id="writing-h">Writing</h2>
            <p>Experiments from systems I run in production, with the numbers and the code.</p>
          </div>
        </div>
        <WritingList items={items} headingId="writing-h" />
      </section>

      <section className="sec" id="projects" aria-labelledby="projects-h">
        <div className="sec-head">
          <div>
            <h2 id="projects-h">Things I’ve built</h2>
            <p>Live products and open-source work. Client systems are described under each role above.</p>
          </div>
        </div>
        <Projects posts={posts} />
      </section>

      <section className={`sec ${styles.about}`} id="about" aria-labelledby="about-h">
        <h2 id="about-h">About</h2>
        <div>
          <p>
            I studied civil engineering at the University of Nairobi. On a building site, concrete is tested before it
            carries load, and that habit came with me into software. When I change how an AI system works, I measure
            it before I trust it, and I write down what the test does not show.
          </p>
          <p>
            I moved into software in 2023, building for clients first and then my own products.{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://uwazo.com/">Uwazo</a> taught me what it takes for professionals to trust an AI answer.{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://www.pelmio.app/">Pelmio</a> is teaching me where a model’s judgement should end and
            ordinary code should take over.
          </p>
          <p>
            The quickest way to reach me is <a href={`mailto:${site.email}`}>email</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
