import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => readFile(path.join(process.cwd(), "assets", "fonts", file));

/** The three staggered spans from the work-history trace, used as a small mark. */
function TraceMark() {
  const bars = [
    { left: 0, width: 150, color: "#1baf7a" },
    { left: 40, width: 110, color: "#eb6834" },
    { left: 80, width: 70, color: "#2a78d6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 150 }}>
      {bars.map((b) => (
        <div key={b.color} style={{ display: "flex", marginLeft: b.left, width: b.width, height: 14, borderRadius: 4, background: b.color }} />
      ))}
    </div>
  );
}

/** Social card: a kicker, a title, an optional line under it, and the byline. */
export async function socialCard({ kicker, title, line }: { kicker: string; title: string; line?: string }) {
  const [bold, medium] = await Promise.all([font("MonaSans-SemiExpanded-Bold.ttf"), font("MonaSans-Medium.ttf")]);
  const size = title.length > 90 ? 50 : title.length > 60 ? 58 : 68;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f5f6f8",
          color: "#14171c",
          fontFamily: "Mona Sans",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#646c78" }}>{kicker}</div>
          <TraceMark />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1 }}>{title}</div>
          {line && (
            <div style={{ display: "flex", fontSize: 28, fontWeight: 500, lineHeight: 1.35, color: "#3d444f", maxWidth: 1000 }}>
              {line}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 500, color: "#646c78" }}>
          <span style={{ color: "#14171c", fontWeight: 700 }}>Victor Kimani</span>
          <span>Applied AI engineer</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Mona Sans", data: bold, weight: 700, style: "normal" },
        { name: "Mona Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
