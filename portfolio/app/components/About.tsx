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
        I have always loved building things. I began my journey designing and
        building physical solutions as a civil engineer before discovering my
        passion for programming. Being able to create good software is a
        superpower that lifts the boundaries of what is thought to be possible.
        I am excited to see how far I can push these boundaries and how many
        more problems I can solve.
        <p className="mt-2">
          I am currently working on{" "}
          <a
            className="font-bold underline decoration-green-400 underline-offset-4 transition-all hover:underline hover:decoration-green-600 hover:decoration-2"
            href="https://baini-images.web.app/"
            target="_blank"
            rel="noopener"
          >
            Baini
          </a>
          , a platform that enables creators to cryptographically sign their
          images and verify provenance information.
        </p>
        <p className="mt-2">
          I am currently open to interesting opportunities to apply my skills.
        </p>
      </div>
    </section>
  );
}

export default About;
