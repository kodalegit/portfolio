import Image from "next/image";
import Baini from "@/public/Baini.png";
import Ujenzi from "@/public/Ujenzi.png";

function Projects() {
  return (
    <section>
      <h1 className="font-bold text-2xl my-2">Some of my work</h1>
      <div className="my-2">
        <h2 className="font-semibold text-xl">Baini</h2>
        <div>
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
          <a className="hover:underline" href="https://baini-images.web.app/">
            Visit
          </a>
        </div>
      </div>
      <div className="my-2">
        <h2 className="font-semibold text-xl">Ujenzi</h2>
        <div>
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
          <a className="hover:underline" href="https://ujenzi.tech/">
            Visit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
