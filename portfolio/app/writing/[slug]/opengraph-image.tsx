import { getAllPosts, getPost } from "@/lib/posts";
import { ogSize, socialCard } from "@/lib/og";
import { topics } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article by Victor Kimani";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug)!;
  return socialCard({
    kicker: post.topics.map((t) => topics[t]).join(", "),
    title: post.title,
    line: post.result,
  });
}
