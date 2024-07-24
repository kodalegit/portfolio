import Image from "next/image";
import Baini from "@/public/Baini.png";
import Ujenzi from "@/public/Ujenzi.png";
import { Separator } from "./ui/separator";

function Projects() {
  return (
    <section className="max-w-4xl w-full p-8 min-h-screen">
      <div className="flex items-center">
        <Separator className="w-1/2 mr-5 bg-slate-700" />
        <h1 className="font-bold text-4xl my-2">
          Some of my work<span className="text-green-400">.</span>
        </h1>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl text-green-300">Baini</h2>
        <div className="my-6">
          <Image src={Baini} alt="Baini Screenshot" width={800} height={400} />
        </div>
        <div>
          <p>
            A web application that enables creators to provide tamper-evident
            signatures on images thus recording the source and history of an
            image in its metadata. Creators can also verify images and check for
            provenance information and signs of tampering on image signatures.
          </p>
          <div className="flex gap-2">
            <p>React</p>
            <p>TypeScript</p>
            <p>Express</p>
            <p>Docker</p>
            <p>Google Cloud Platform</p>
            <p>Firebase</p>
            <p>Cloud Firestore</p>
          </div>
          <a
            className="font-bold underline decoration-green-400 underline-offset-4 transition-all hover:underline hover:decoration-green-600 hover:decoration-2"
            href="https://baini-images.web.app/"
            target="_blank"
            rel="noopener"
          >
            Visit
          </a>
        </div>
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-2xl text-green-300">Ujenzi</h2>
        <div className="my-6">
          <Image
            src={Ujenzi}
            alt="Ujenzi Screenshot"
            width={800}
            height={400}
          />
        </div>
        <div>
          <p>
            An AI-powered web platform for engineers and technicians to perform
            accurate concrete strength predictions without having to wait for
            laboratory tests. Users provide concrete mix parameters that are ran
            through a machine learning model which instantly provides an
            accurate concrete strength prediction.
          </p>
          <div className="flex gap-2">
            <p>React</p>
            <p>Django</p>
            <p>Scikit-learn</p>
            <p>Google Cloud Platform</p>
            <p>PostgreSQL</p>
          </div>
          <a
            className="font-bold underline decoration-green-400 underline-offset-4 transition-all hover:underline hover:decoration-green-600 hover:decoration-2"
            href="https://ujenzi.tech/"
            target="_blank"
            rel="noopener"
          >
            Visit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
