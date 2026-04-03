import { Separator } from "./ui/separator";
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
      <div className="flex items-center w-7/12 md:w-8/12">
        <h1 className="font-bold text-2xl md:text-4xl my-2">
          Experience<span className="text-green-400">.</span>
        </h1>
        <Separator className="ml-2 w-10/12 max-w-96 bg-slate-700" />
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">AI Engineer</span> @ Crafted Systems
        </h2>
        <p className="text-slate-400 text-sm mt-1">Dec 2025 - Apr 2026</p>
        <p className="text-slate-400 mt-3">
          Designed and deployed agentic AI workflows, RAG systems, and
          evaluation frameworks for enterprise financial platforms used by banks
          and SACCOs, with a strong focus on privacy, reliability, and
          production readiness.
        </p>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">Founder & Lead Engineer</span> @
          Uwazo
        </h2>
        <p className="text-slate-400 text-sm mt-1">2025 - Present</p>
        <p className="text-slate-400 mt-3">
          Built an AI-powered tax advisory platform with document ingestion,
          vector search, and contextual memory, while designing agentic,
          citation-backed workflows and leading product development end to end.
        </p>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">Software Engineering Consultant</span> @ Islet
          Group
        </h2>
        <p className="text-slate-400 text-sm mt-1">2024 - Present</p>
        <p className="text-slate-400 mt-3">
          Developed and launched primary digital platforms for Kenya's largest
          pharmaceutical association and the Kenya Dental Association, including
          custom API integrations for certification tracking and events
          management at scale.
        </p>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">Engineer</span> @ Athi Water Works
          Agency
        </h2>
        <p className="text-slate-400 text-sm mt-1">Jul 2022 - Oct 2024</p>
        <p className="text-slate-400 mt-3">
          Collaborated across teams to define requirements, shape solutions, and
          deliver infrastructure projects within scope and timeline.
        </p>
      </div>
    </section>
  );
}

export default Experience;
