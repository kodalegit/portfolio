import { Separator } from "./ui/separator";
import { useRef } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";
import { Button } from "./ui/button";
import FlatGitHubIcon from "./icons/FlatGitHubIcon";

function Projects({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.4 });
  inViewport && setActiveSection("projects");
  return (
    <section
      ref={targetRef}
      id="projects"
      className="w-full p-4 md:p-8 min-h-screen"
    >
      <div className="flex items-center justify-end max-w-4xl">
        <Separator className="mr-3 w-8/12 max-w-96 bg-slate-700" />
        <h1 className="font-bold text-2xl md:text-4xl my-2 pr-2">
          Projects<span className="text-green-400">.</span>
        </h1>
      </div>
      <div
        className="relative mt-6 h-96 bg-cover bg-center rounded-md md:mx-2 lg:mx-20"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Baini-AHSGlxIvUiO5CQE8d5ED4yosBSLGLz.png')`,
        }}
      >
        <div className="absolute inset-0 bg-slate-900 bg-opacity-95 flex items-center justify-center">
          <div className="text-left text-slate-400 p-2 md:p-8 max-sm:text-sm max-w-screen-md">
            <h2 className="font-semibold text-2xl md:text-4xl mb-4 text-green-500">
              Baini
            </h2>
            <p className="mb-4">
              A web application that enables creators to provide tamper-evident
              signatures on images thus recording the source and history of an
              image in its metadata. Creators can also verify images and check
              for provenance information and signs of tampering on image
              signatures.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <p className="bg-slate-700 px-1 rounded-lg">React</p>
              <p className="bg-slate-700 px-1 rounded-lg">TypeScript</p>
              <p className="bg-slate-700 px-1 rounded-lg">Express</p>
              <p className="bg-slate-700 px-1 rounded-lg">Docker</p>
              <p className="bg-slate-700 px-1 rounded-lg">
                Google Cloud Platform
              </p>
              <p className="bg-slate-700 px-1 rounded-lg">Firebase</p>
              <p className="bg-slate-700 px-1 rounded-lg">Cloud Firestore</p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent rounded-3xl"
                asChild
              >
                <a href="" target="_blank" rel="noopener">
                  Preview
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent rounded-3xl"
                asChild
              >
                <a
                  href="https://baini-images.web.app/"
                  target="_blank"
                  rel="noopener"
                >
                  Visit
                </a>
              </Button>
              <a
                href="https://github.com/kodalegit"
                target="_blank"
                rel="noopener"
              >
                <FlatGitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative mt-12 h-96 bg-cover bg-center rounded-md md:mx-2 lg:mx-20"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Ujenzi-47KC9J9e9Jy3R0Hw1jzkY0ffDgXV9E.png')`,
        }}
      >
        <div className="absolute inset-0 bg-slate-900 bg-opacity-95 flex items-center justify-center">
          <div className="text-left text-slate-400 p-4 md:p-8 max-sm:text-sm max-w-screen-md">
            <h2 className="font-semibold text-2xl md:text-4xl mb-4 text-green-500">
              Ujenzi
            </h2>
            <p className="mb-4">
              An AI-powered web platform for engineers and technicians to
              perform accurate concrete strength predictions without having to
              wait for laboratory tests. Users provide concrete mix parameters
              that are ran through a machine learning model which instantly
              provides an accurate concrete strength prediction.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <p className="bg-slate-700 px-1 rounded-lg">React</p>
              <p className="bg-slate-700 px-1 rounded-lg">Django</p>
              <p className="bg-slate-700 px-1 rounded-lg">Scikit-learn</p>
              <p className="bg-slate-700 px-1 rounded-lg">
                Google Cloud Platform
              </p>
              <p className="bg-slate-700 px-1 rounded-lg">PostgreSQL</p>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent rounded-3xl"
                asChild
              >
                <a href="" target="_blank" rel="noopener">
                  Preview
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent rounded-3xl"
                asChild
              >
                <a href="https://ujenzi.tech/" target="_blank" rel="noopener">
                  Visit
                </a>
              </Button>
              <a
                href="https://github.com/kodalegit/mlvalidation"
                target="_blank"
                rel="noopener"
              >
                <FlatGitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
