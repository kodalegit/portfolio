import { useRef, useEffect } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";
import EmailIcon from "./icons/EmailIcon";

function Contacts({ setActiveSection }: setActiveProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewPort(targetRef, { threshold: 0.5 });
  useEffect(() => {
    if (inViewport) {
      setActiveSection("contacts");
    }
  }, [inViewport, setActiveSection]);

  return (
    <section
      ref={targetRef}
      id="contacts"
      className="max-w-4xl w-full p-8 pt-10 min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 tracking-tight">
        Get In Touch<span className="text-green-400">.</span>
      </h2>
      <p className="text-slate-400 leading-relaxed text-center max-w-md">
        Find me on email if you want to connect. You can also reach me on my{" "}
        <a
          target="_blank"
          rel="noopener"
          className="text-slate-200 underline decoration-green-400/60 underline-offset-4 transition-all hover:decoration-green-400 hover:decoration-2"
          href="https://www.linkedin.com/in/victorkimani77/"
        >
          LinkedIn
        </a>
        .
      </p>
      <a
        className="flex items-center mt-6 gap-2 group"
        href="mailto:victorkimani77@gmail.com"
      >
        <EmailIcon />
        <span className="text-slate-400 text-sm tracking-wide group-hover:text-green-400 transition-colors duration-300">
          victorkimani77@gmail.com
        </span>
      </a>
    </section>
  );
}

export default Contacts;
