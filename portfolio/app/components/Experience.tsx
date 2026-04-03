import { useRef, useEffect } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";

function Experience({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  useEffect(() => {
    if (inViewport) {
      setActiveSection("experience");
    }
  }, [inViewport, setActiveSection]);

  return (
    <section
      ref={targetRef}
      id="experience"
      className="max-w-4xl w-full p-8 pt-10 min-h-screen mt-10"
    >
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-10 tracking-tight">
        Experience<span className="text-green-400">.</span>
      </h2>
      <div className="border-l border-slate-800 pl-8 ml-2 space-y-10">
        <div className="relative">
          <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-green-400" />
          <h3 className="font-semibold text-lg">
            <span className="text-green-400">AI Engineer</span>{" "}
            <span className="text-slate-500">@ Crafted Systems</span>
          </h3>
          <p className="text-slate-500 text-xs tracking-wider uppercase mt-1">
            Dec 2025 — Apr 2026
          </p>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Designed and deployed agentic AI workflows, RAG systems, and
            evaluation frameworks for enterprise financial platforms used by
            banks and SACCOs, with a strong focus on privacy, reliability, and
            production readiness.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-green-400" />
          <h3 className="font-semibold text-lg">
            <span className="text-green-400">Founder & Lead Engineer</span>{" "}
            <span className="text-slate-500">@ Uwazo</span>
          </h3>
          <p className="text-slate-500 text-xs tracking-wider uppercase mt-1">
            2025 — Present
          </p>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Built an AI-powered tax advisory platform with document ingestion,
            vector search, and contextual memory, while designing agentic,
            citation-backed workflows and leading product development end to end.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-green-400" />
          <h3 className="font-semibold text-lg">
            <span className="text-green-400">Software Engineering Consultant</span>{" "}
            <span className="text-slate-500">@ Islet Group</span>
          </h3>
          <p className="text-slate-500 text-xs tracking-wider uppercase mt-1">
            2024 — Present
          </p>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Developed and launched primary digital platforms for Kenya&apos;s largest
            pharmaceutical association and the Kenya Dental Association,
            including custom API integrations for certification tracking and
            events management at scale.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-green-400" />
          <h3 className="font-semibold text-lg">
            <span className="text-green-400">Engineer</span>{" "}
            <span className="text-slate-500">@ Athi Water Works Agency</span>
          </h3>
          <p className="text-slate-500 text-xs tracking-wider uppercase mt-1">
            Jul 2022 — Oct 2024
          </p>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Collaborated across teams to define requirements, shape solutions,
            and deliver infrastructure projects within scope and timeline.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Experience;
