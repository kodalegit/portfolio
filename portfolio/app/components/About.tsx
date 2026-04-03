import { useRef, useEffect } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";

function About({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  useEffect(() => {
    if (inViewport) {
      setActiveSection("about");
    }
  }, [inViewport, setActiveSection]);

  return (
    <section
      ref={targetRef}
      id="about"
      className="max-w-4xl w-full pt-10 p-8 min-h-screen"
    >
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-10 tracking-tight">
        About Me<span className="text-green-400">.</span>
      </h2>
      <div className="text-slate-400 leading-relaxed space-y-4 w-full md:w-10/12">
        <p>I&apos;ve always been drawn to building things.</p>
        <p>
          I started out as a civil engineer, working on physical infrastructure
          and seeing firsthand how systems shape people&apos;s everyday lives. Over
          time, I became increasingly interested in the digital side of
          problem-solving and transitioned into software engineering, where the
          ability to build and iterate quickly opened up an entirely new way of
          thinking.
        </p>
        <p>
          Today, I focus on building AI-powered systems for real-world,
          high-stakes environments. My work spans agentic workflows, full-stack
          applications, and tools that help professionals make better decisions
          with complex data.
        </p>
        <p>
          Building{" "}
          <a
            className="text-slate-200 underline decoration-green-400/60 underline-offset-4 transition-all hover:decoration-green-400 hover:decoration-2"
            href="https://uwazo.com/"
            target="_blank"
            rel="noopener"
          >
            Uwazo
          </a>
          , an AI-powered tax advisory platform, gave me a deeper appreciation
          for what it takes to create products people trust and rely on — beyond
          just the technical side.
        </p>
        <p>
          I&apos;m especially interested in problems where technology,
          decision-making, and real-world impact intersect.
        </p>
      </div>
    </section>
  );
}

export default About;
