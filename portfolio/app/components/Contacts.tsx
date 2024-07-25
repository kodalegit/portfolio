import { useRef } from "react";
import useInViewPort from "../hooks/useActiveSection";
import { setActiveProps } from "../types/types";

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
      <div className="flex items-center">
        <h1 className="font-bold text-5xl my-2">
          Get In Touch<span className="text-green-400">.</span>
        </h1>
      </div>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/victorkimani77/">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/kodalegit">Github</a>
        </li>
      </ul>
    </section>
  );
}

export default Contacts;
