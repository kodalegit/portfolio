import { Separator } from "./ui/separator";
import { useRef } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";

function Experience({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  inViewport && setActiveSection("experience");
  return (
    <section
      ref={targetRef}
      id="experience"
      className="max-w-4xl w-full p-8 min-h-screen"
    >
      <div className="flex items-center w-8/12">
        <h1 className="font-bold text-2xl md:text-4xl my-2 flex-shrink-0">
          Experience<span className="text-green-400">.</span>
        </h1>
        <Separator className="flex-grow ml-5 bg-slate-700" />
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">Full-Stack Developer Intern </span>@
          Boxraft Ltd
        </h2>
        <p className="text-slate-400 text-sm mt-1">Oct 2023 - Dec 2023</p>
        <p className="text-slate-400 mt-3">
          Built a Minimum Viable Product using Django to showcase integration of
          generative AI into the existing news website. Delivered the successful
          prototype and presented it to the company CEO.
        </p>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-xl">
          <span className="text-green-400">Engineer </span>@ Athi Water Works
          Agency
        </h2>
        <p className="text-slate-400 text-sm mt-1">Jul 2022 - Oct 2023</p>
        <p className="text-slate-400 mt-3">
          Collaborated with cross-functional teams to gather requirements,
          design solutions, and deliver high-quality projects within defined
          timelines
        </p>
      </div>
    </section>
  );
}

export default Experience;
