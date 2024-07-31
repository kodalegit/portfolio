import { useRef } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";
import EmailIcon from "./icons/EmailIcon";
import { Separator } from "./ui/separator";

function Contacts({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  inViewport && setActiveSection("contacts");
  return (
    <section
      ref={targetRef}
      id="contacts"
      className="max-w-4xl w-full p-8 min-h-screen"
    >
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-3xl md:text-5xl my-2">
          Get In Touch<span className="text-green-400">.</span>
        </h1>
      </div>
      <p>
        Find me on email if you want to connect. You can also reach me on my{" "}
        <a
          className="font-bold underline decoration-green-400 underline-offset-4 transition-all hover:underline hover:decoration-green-600 hover:decoration-2"
          href="https://www.linkedin.com/in/victorkimani77/"
        >
          LinkedIn
        </a>
        .
      </p>

      <a
        className="flex items-center justify-center mt-4 space-x-2 group font-bold"
        href="mailto:victorkimani77@gmail.com"
      >
        <EmailIcon />
        <span className="group-hover:text-green-500">
          victorkimani77@gmail.com
        </span>
      </a>
    </section>
  );
}

export default Contacts;
