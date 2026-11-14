import { ogSize, socialCard } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Victor Kimani, applied AI engineer";

export default function Image() {
  return socialCard({
    kicker: "Kenya",
    title: "I build AI agents, retrieval systems and the evaluations that show whether they work.",
    line: "Applied AI engineer. Writing up experiments from systems I run in production.",
  });
}
