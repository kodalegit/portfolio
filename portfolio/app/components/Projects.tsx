import Image from "next/image";
import { useRef, useEffect } from "react";
import { ArrowUpRight, BookOpen, Github, Play } from "lucide-react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

const blobBase = "https://gi9pozqnuexhf2qt.public.blob.vercel-storage.com";

const actionClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950";

interface Project {
  name: string;
  category: string;
  description: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  video?: string;
  visit?: string;
  source?: string;
  article?: string;
}

const projects: Project[] = [
  {
    name: "Pelmio",
    category: "AI · Interactive learning",
    description: [
      "Turns lesson plans into interactive learning missions. AI drafts activities from teachers’ own materials, and teachers refine, preview, and approve each mission before assigning it.",
      "Learners repair circuits, run simulations, weigh evidence, and solve maths problems. Their predictions, attempts, and explanations give teachers a view into how they think.",
    ],
    technologies: ["Next.js", "FastAPI", "Docker", "PostgreSQL"],
    image: `${blobBase}/Pelmio%20Screenshot-2U5ADr0YVgWOKtXv3n5gwpSLjFJpEI`,
    imageAlt:
      "Pelmio showing how lesson notes become an interactive learning mission",
    visit: "https://www.pelmio.app/",
  },
  {
    name: "Uwazo",
    category: "AI agents · Legal research",
    description: [
      "An AI research assistant for lawyers and tax professionals. Combines retrieval-augmented generation (RAG), web search, and contextual memory to answer questions with supporting legal sources.",
      "Document uploads and separate workspaces keep research tailored to each matter, from tax law and case law to business regulations.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Docker",
      "GCP",
      "Vercel",
    ],
    image: `${blobBase}/Uwazo%20Screenshot-GXxqFLtTg3BqcmUpVxbZpYBG8d3AMp`,
    imageAlt: "Uwazo legal, tax, and finance AI assistant homepage",
    video: `${blobBase}/Videos/Uwazo%20Project%20Demo.mp4`,
    visit: "https://www.uwazo.com/",
  },
  {
    name: "Sentinel",
    category: "Machine learning · Procurement",
    description: [
      "Helps auditors investigate possible fraud and conflicts of interest in Kenyan public procurement. Machine learning and relationship graphs flag unusual tenders and connections between companies, directors, and officials.",
      "Explained risk scores support investigation, while a LangGraph agent grounds case analysis in evidence and Kenyan procurement law.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Neo4j",
      "LangGraph",
      "scikit-learn",
      "Docker",
    ],
    image: `${blobBase}/Sentinel%20Screenshot-LVszDV3oqZlAThNAoya28UzKtax7NF`,
    imageAlt:
      "Sentinel dashboard with procurement risk scores and flagged tenders",
    video: `${blobBase}/Videos/Sentinel%20Project%20Demo`,
    source: "https://github.com/kodalegit/sentinel",
  },
  {
    name: "Ujenzi",
    category: "Machine learning · Engineering",
    description: [
      "Uses machine learning to estimate concrete strength from mix proportions. Engineers and technicians enter their mix parameters and get an immediate prediction to support planning ahead of laboratory testing.",
      "Brings a trained prediction model into a practical web application for exploring concrete mix designs.",
    ],
    technologies: ["React", "Django", "scikit-learn", "GCP", "PostgreSQL"],
    image: `${blobBase}/Ujenzi-47KC9J9e9Jy3R0Hw1jzkY0ffDgXV9E.png`,
    imageAlt: "Ujenzi concrete mix design and strength prediction application",
    video: `${blobBase}/Ujenzi%20-%20Trim%20-%20Google%20Chrome%202024-07-30%2023-52-24-qgSiO2dFedgcvWLkPDGWEkFq1HQQpA.mp4`,
    visit: "https://monolith-935048637315.us-central1.run.app/",
    source: "https://github.com/kodalegit/mlvalidation",
  },
  {
    name: "Baini",
    category: "Content authenticity",
    description: [
      "Helps creators sign images with tamper-evident credentials, recording their source and history in the image metadata.",
      "Users can verify signatures, inspect provenance information, and check for signs that an image has been altered.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "Docker",
      "GCP",
      "Firebase",
      "Cloud Firestore",
    ],
    image: `${blobBase}/Baini-AHSGlxIvUiO5CQE8d5ED4yosBSLGLz.png`,
    imageAlt: "Baini image signing and provenance verification interface",
    video: `${blobBase}/Videos/Baini%20-%20Google%20Chrome%202024-08-20%2000-56-19-m8c3fIblqgTPcztQnsLC4uTE7njTJZ.mp4`,
    visit: "https://baini-images.web.app/",
    source: "https://github.com/kodalegit/baini-public",
  },
  {
    name: "reactify-django CLI",
    category: "Developer tooling · Open source",
    description: [
      "A command-line tool that sets up React inside Django with Webpack already configured. Add React to an existing project or scaffold a new one from scratch.",
      "Includes options for TypeScript and Tailwind CSS, and is published on npm.",
    ],
    technologies: ["TypeScript", "npm"],
    image: `${blobBase}/reactify-django-JmAuDeCPzaNIIPvgALaSByDjAuujS0.png`,
    imageAlt: "reactify-django CLI repository and setup documentation",
    source: "https://github.com/kodalegit/reactify-django",
    article:
      "https://medium.com/@victorkimani77/integrate-react-into-django-seamlessly-with-the-reactify-django-cli-19594ecca1c4",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      aria-labelledby={`project-${index}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30 transition-colors duration-300 hover:border-slate-600"
    >
      <div className="border-b border-slate-800 bg-slate-900/70 p-4 sm:p-6">
        <div className="overflow-hidden rounded-md border border-slate-700/70 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
          <div
            aria-hidden="true"
            className="flex h-7 items-center gap-1.5 border-b border-slate-700/60 bg-slate-950 px-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1216px) 488px, (min-width: 1024px) calc((100vw - 200px) / 2), calc(100vw - 160px)"
              className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-green-400">
            {project.category}
          </p>
          <span aria-hidden="true" className="font-mono text-xs text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          id={`project-${index}`}
          className="font-display text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl"
        >
          {project.name}
        </h3>
        <div className="mb-6 mt-4 space-y-3 text-sm leading-7 text-slate-400">
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul
          aria-label={`${project.name} technologies`}
          className="mb-6 mt-auto flex flex-wrap gap-2"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-md border border-slate-700/60 bg-slate-800/40 px-2 py-1 font-mono text-[10px] leading-4 text-slate-300"
            >
              {technology}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-800 pt-4">
          {project.visit && (
            <a
              href={project.visit}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
              className={`${actionClass} text-green-400 hover:text-green-200`}
            >
              Visit <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
          {project.video && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`Preview ${project.name}`}
                  className={`${actionClass} text-slate-300 hover:text-white`}
                >
                  <Play aria-hidden="true" className="h-3.5 w-3.5" /> Preview
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90dvh] overflow-y-auto border-slate-700 bg-slate-950 p-4 shadow-2xl sm:max-w-3xl sm:p-6">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl text-slate-100">
                    {project.name} Preview
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    A walkthrough of {project.name} in action.
                  </DialogDescription>
                </DialogHeader>
                <video
                  src={project.video}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="max-h-[65dvh] w-full rounded-md border border-slate-800 bg-black"
                />
              </DialogContent>
            </Dialog>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source on GitHub`}
              className={`${actionClass} text-slate-300 hover:text-white`}
            >
              <Github aria-hidden="true" className="h-4 w-4" /> Source
            </a>
          )}
          {project.article && (
            <a
              href={project.article}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the ${project.name} article`}
              className={`${actionClass} text-slate-300 hover:text-white`}
            >
              <BookOpen aria-hidden="true" className="h-4 w-4" /> Article
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, {
    threshold: 0,
    rootMargin: "-15% 0px -15% 0px",
  });

  useEffect(() => {
    if (inViewport) setActiveSection("projects");
  }, [inViewport, setActiveSection]);

  return (
    <section
      ref={targetRef}
      id="projects"
      className="w-full max-w-6xl scroll-mt-20 px-6 py-16 sm:px-8 lg:px-10"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-slate-800 pb-8">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Projects<span className="text-green-400">.</span>
        </h2>
        <p className="max-w-sm text-sm leading-6 text-slate-400">
          AI systems, useful applications, and tools I&apos;ve built along the
          way.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
