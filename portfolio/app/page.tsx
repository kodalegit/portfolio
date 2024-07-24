import Intro from "./components/Intro";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Intro />
      <About />
      <Projects />
      <Experience />
      <Contacts />
    </main>
  );
}
