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
          and seeing firsthand how systems shape people&apos;s everyday lives.
          Over time, I became increasingly interested in the digital side of
          problem-solving and transitioned into software engineering, where the
          ability to build and iterate quickly opened up an entirely new way of
          thinking.
        </p>
        <p>
          Today, I focus on AI engineering: building agents, retrieval systems,
          and full-stack applications that help people work with complex
          information. I care as much about evaluating these systems and making
          them reliable as I do about getting them to work in the first place.
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
          , an AI assistant for legal and tax research, gave me a deeper
          appreciation for what it takes to create products people trust and
          rely on — beyond just the technical side.
        </p>
        <p>
          I&apos;m currently building{" "}
          <a
            className="text-slate-200 underline decoration-green-400/60 underline-offset-4 transition-all hover:decoration-green-400 hover:decoration-2"
            href="https://www.pelmio.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pelmio
          </a>
          , a learning platform where AI helps teachers turn their own materials
          into interactive missions. Teachers shape and approve each activity,
          and learners explore, experiment, and explain their thinking.
        </p>
      </div>
    </section>
  );
}

export default About;
