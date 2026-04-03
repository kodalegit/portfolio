import { Separator } from "./ui/separator";
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
      <div className="flex items-center w-1/2 md:w-8/12">
        <h1 className="font-bold text-2xl md:text-4xl my-2 flex-shrink-0">
          About Me<span className="text-green-400">.</span>
        </h1>
        <Separator className="flex-grow ml-3 max-w-96 bg-slate-700" />
      </div>
      <div className="text-slate-400 font-light mt-6 w-full md:w-10/12">
        I've always been drawn to building things.
        <p className="mt-2">
          I started out as a civil engineer, working on physical infrastructure
          and seeing firsthand how systems shape people's everyday lives. Over
          time, I became increasingly interested in the digital side of
          problem-solving and transitioned into software engineering, where the
          ability to build and iterate quickly opened up an entirely new way of
          thinking.
        </p>
        <p className="mt-2">
          Today, I focus on building AI-powered systems for real-world,
          high-stakes environments. My work spans agentic workflows, full-stack
          applications, and tools that help professionals make better decisions
          with complex data.
        </p>
        <p className="mt-2">
          Building{" "}
          <a
            className="font-bold underline decoration-green-400 underline-offset-4 transition-all hover:underline hover:decoration-green-600 hover:decoration-2"
            href="https://uwazo.com/"
            target="_blank"
            rel="noopener"
          >
            Uwazo
          </a>
          , an AI-powered tax advisory platform, gave me a deeper appreciation
          for what it takes to create products people trust and rely on - beyond
          just the technical side.
        </p>
        <p className="mt-2">
          I'm especially interested in problems where technology,
          decision-making, and real-world impact intersect.
        </p>
      </div>
    </section>
  );
}

export default About;
