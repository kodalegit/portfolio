"use client";

import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";
import Reveal from "./components/Reveal";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  return (
    <div>
      {/* <NavBar /> */}
      <SideBar activeSection={activeSection} />
      <main className="flex flex-col items-center">
        <Reveal>
          <Intro />
        </Reveal>
        <Reveal>
          <About setActiveSection={setActiveSection} />
        </Reveal>
        <Reveal>
          <Projects setActiveSection={setActiveSection} />
        </Reveal>
        <Reveal>
          <Experience setActiveSection={setActiveSection} />
        </Reveal>
        <Reveal>
          <Contacts setActiveSection={setActiveSection} />
        </Reveal>
      </main>
    </div>
  );
}
