import { Separator } from "./ui/separator";
import { useRef } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";

function About({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  inViewport && setActiveSection("about");
  return (
    <section
      ref={targetRef}
      id="about"
      className="max-w-4xl w-full p-8 min-h-screen"
    >
      <div className="flex items-center w-8/12">
        <h1 className="font-bold text-2xl md:text-4xl my-2 flex-shrink-0">
          About Me<span className="text-green-400">.</span>
        </h1>
        <Separator className="flex-grow ml-5 bg-slate-700" />
      </div>
      <div className="text-slate-400 font-light mt-6 w-full md:w-10/12">
        I am passionate about solving problems in an elegant and performant way.
        I started out designing and building physical solutions as a civil
        engineer then transitioned into the limitless digital world where I'm
        unbound by the laws of Physics(sort of).
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
          I am open to opportunities that can enable me to grow, innovate and
          challenge the bounds of what is thought to be possible.
        </p>
      </div>
    </section>
  );
}

export default About;
