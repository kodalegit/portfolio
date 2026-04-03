import { useRef, useEffect } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";
import { Button } from "./ui/button";
import FlatGitHubIcon from "./icons/FlatGitHubIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

const btnClass =
  "bg-slate-950/70 border-slate-700 text-slate-300 text-xs tracking-wider uppercase hover:bg-slate-900/90 hover:border-green-300 hover:text-green-300 transition-all duration-300 rounded-full backdrop-blur-sm";

const modalClass =
  "bg-slate-950/95 border-slate-800 shadow-2xl sm:max-w-3xl p-3 sm:p-4";

function Projects({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.3 });
  useEffect(() => {
    if (inViewport) {
      setActiveSection("projects");
    }
  }, [inViewport, setActiveSection]);

  return (
    <section
      ref={targetRef}
      id="projects"
      className="w-full p-4 pt-10 md:p-8 min-h-screen"
    >
      <div className="flex items-center justify-end max-w-4xl mb-10">
        <h2 className="font-display font-bold text-3xl md:text-5xl pr-2 tracking-tight">
          Projects<span className="text-green-400">.</span>
        </h2>
      </div>

      {/* Uwazo */}
      <div
        className="relative mt-8 h-96 bg-cover bg-center rounded-lg overflow-hidden border border-slate-800/50 md:mx-2 lg:mx-20 group"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Uwazo%20Screenshot%202025-07-28%20181837.png')`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Uwazo%20Screenshot%202025-07-28%20181837.png')`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.985)_0%,rgba(2,6,23,0.965)_24%,rgba(2,6,23,0.935)_56%,rgba(2,6,23,0.97)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.955)_24%,rgba(2,6,23,0.92)_56%,rgba(2,6,23,0.965)_100%)] transition-all duration-500 flex items-center justify-center">
          <div className="text-left text-slate-300 p-4 md:p-8 max-sm:text-sm max-w-screen-md rounded-md bg-slate-950/55 border border-slate-700/40 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-[2px]">
            <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 text-green-400">
              Uwazo
            </h3>
            <p className="mb-4 leading-relaxed">
              Uwazo is an AI-powered legal assistant for lawyers and tax
              professionals. It uses an agentic workflow combining
              Retrieval-Augmented Generation (RAG) and web search to answer
              complex queries grounded in tax law, case law, and business
              regulations. Users can upload documents for context-aware
              responses, work across multiple isolated workspaces, and benefit
              from personalized outputs through memory-based user profiling.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center mb-5">
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Next.js
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                TypeScript
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                FastAPI
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Python
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Docker
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                GCP
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Vercel
              </span>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className={btnClass}>
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className={modalClass}>
                  <DialogHeader className="pb-2">
                    <DialogTitle className="font-display text-xl text-slate-100">
                      Uwazo Preview
                    </DialogTitle>
                  </DialogHeader>
                  <video
                    src="https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Videos/Uwazo%20Project%20Demo.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto rounded-md border border-slate-800 bg-black"
                  ></video>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" className={btnClass} asChild>
                <a href="https://www.uwazo.com/" target="_blank" rel="noopener">
                  Visit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ujenzi */}
      <div
        className="relative mt-8 h-96 bg-cover bg-center rounded-lg overflow-hidden border border-slate-800/50 md:mx-2 lg:mx-20 group"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Ujenzi-47KC9J9e9Jy3R0Hw1jzkY0ffDgXV9E.png')`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Ujenzi-47KC9J9e9Jy3R0Hw1jzkY0ffDgXV9E.png')`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.985)_0%,rgba(2,6,23,0.965)_24%,rgba(2,6,23,0.935)_56%,rgba(2,6,23,0.97)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.955)_24%,rgba(2,6,23,0.92)_56%,rgba(2,6,23,0.965)_100%)] transition-all duration-500 flex items-center justify-center">
          <div className="text-left text-slate-300 p-4 md:p-8 max-sm:text-sm max-w-screen-md rounded-md bg-slate-950/55 border border-slate-700/40 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-[2px]">
            <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 text-green-400">
              Ujenzi
            </h3>
            <p className="mb-4 leading-relaxed">
              An AI-powered web platform for engineers and technicians to
              perform accurate concrete strength predictions without having to
              wait for laboratory tests. Users provide concrete mix parameters
              that are ran through a machine learning model which instantly
              provides an accurate concrete strength prediction.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center mb-5">
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                React
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Django
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Scikit-learn
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                GCP
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                PostgreSQL
              </span>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className={btnClass}>
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className={modalClass}>
                  <DialogHeader className="pb-2">
                    <DialogTitle className="font-display text-xl text-slate-100">
                      Ujenzi Preview
                    </DialogTitle>
                  </DialogHeader>
                  <video
                    src="https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Ujenzi%20-%20Trim%20-%20Google%20Chrome%202024-07-30%2023-52-24-qgSiO2dFedgcvWLkPDGWEkFq1HQQpA.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto rounded-md border border-slate-800 bg-black"
                  ></video>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" className={btnClass} asChild>
                <a
                  href="https://monolith-935048637315.us-central1.run.app/"
                  target="_blank"
                  rel="noopener"
                >
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

      {/* Baini */}
      <div
        className="relative mt-8 h-96 bg-cover bg-center rounded-lg overflow-hidden border border-slate-800/50 md:mx-2 lg:mx-20 group"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Baini-AHSGlxIvUiO5CQE8d5ED4yosBSLGLz.png')`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Baini-AHSGlxIvUiO5CQE8d5ED4yosBSLGLz.png')`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.985)_0%,rgba(2,6,23,0.965)_24%,rgba(2,6,23,0.935)_56%,rgba(2,6,23,0.97)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.955)_24%,rgba(2,6,23,0.92)_56%,rgba(2,6,23,0.965)_100%)] transition-all duration-500 flex items-center justify-center">
          <div className="text-left text-slate-300 p-4 md:p-8 max-sm:text-sm max-w-screen-md rounded-md bg-slate-950/55 border border-slate-700/40 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-[2px]">
            <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 text-green-400">
              Baini
            </h3>
            <p className="mb-4 leading-relaxed">
              A web application that enables creators to provide tamper-evident
              signatures on images thus recording the source and history of an
              image in its metadata. Creators can also verify images and check
              for provenance information and signs of tampering on image
              signatures.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center mb-5">
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                React
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                TypeScript
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Express
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Docker
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                GCP
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Firebase
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                Cloud Firestore
              </span>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className={btnClass}>
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className={modalClass}>
                  <DialogHeader className="pb-2">
                    <DialogTitle className="font-display text-xl text-slate-100">
                      Baini Preview
                    </DialogTitle>
                  </DialogHeader>
                  <video
                    src="https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/Videos/Baini%20-%20Google%20Chrome%202024-08-20%2000-56-19-m8c3fIblqgTPcztQnsLC4uTE7njTJZ.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto rounded-md border border-slate-800 bg-black"
                  ></video>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" className={btnClass} asChild>
                <a
                  href="https://baini-images.web.app/"
                  target="_blank"
                  rel="noopener"
                >
                  Visit
                </a>
              </Button>
              <a
                href="https://github.com/kodalegit/baini-public"
                target="_blank"
                rel="noopener"
              >
                <FlatGitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* reactify-django */}
      <div
        className="relative mt-8 h-96 bg-auto bg-center rounded-lg overflow-hidden border border-slate-800/50 md:mx-2 lg:mx-20 group"
        style={{
          backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/reactify-django-JmAuDeCPzaNIIPvgALaSByDjAuujS0.png')`,
        }}
      >
        <div
          className="absolute inset-0 bg-auto bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url('https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com/reactify-django-JmAuDeCPzaNIIPvgALaSByDjAuujS0.png')`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.985)_0%,rgba(2,6,23,0.965)_24%,rgba(2,6,23,0.935)_56%,rgba(2,6,23,0.97)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.955)_24%,rgba(2,6,23,0.92)_56%,rgba(2,6,23,0.965)_100%)] transition-all duration-500 flex items-center justify-center">
          <div className="text-left text-slate-300 p-4 md:p-8 max-sm:text-sm max-w-screen-md rounded-md bg-slate-950/55 border border-slate-700/40 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-[2px]">
            <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 text-green-400">
              reactify-django CLI
            </h3>
            <p className="mb-4 leading-relaxed">
              A CLI tool that automatically configures React within a Django
              project with built-in Webpack support. Users can either integrate
              React into an existing Django project or scaffold a new Django
              project with React from scratch. The CLI also offers options for
              TypeScript support and Tailwind CSS. The package is published on
              npm.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center mb-5">
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                TypeScript
              </span>
              <span className="bg-slate-800/80 text-slate-400 text-xs tracking-wide px-2.5 py-0.5 rounded-full">
                npm
              </span>
            </div>
            <div className="flex justify-center items-center gap-3">
              <a
                href="https://github.com/kodalegit/reactify-django"
                target="_blank"
                rel="noopener"
              >
                <FlatGitHubIcon />
              </a>
              <Button size="sm" variant="outline" className={btnClass} asChild>
                <a
                  href="https://medium.com/@victorkimani77/integrate-react-into-django-seamlessly-with-the-reactify-django-cli-19594ecca1c4"
                  target="_blank"
                  rel="noopener"
                >
                  Article
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
