import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap" style={{ padding: "5rem var(--gutter) 2rem", maxWidth: "40rem" }}>
      <h1 style={{ fontSize: "2rem", fontStretch: "112%", margin: "0 0 0.75rem" }}>Page not found</h1>
      <p style={{ color: "var(--ink-2)", margin: "0 0 1.5rem" }}>
        The link may be old, or the page may have moved. The articles are all listed under Writing.
      </p>
      <p style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: 0 }}>
        <Link className="btn btn-primary" href="/writing">
          Go to Writing
        </Link>
        <Link className="btn" href="/">
          Go to the home page
        </Link>
      </p>
    </main>
  );
}
