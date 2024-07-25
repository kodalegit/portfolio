"use client";
import useActiveSection from "../hooks/useActiveSection";

function SideBar({ activeSection }: { activeSection: string }) {
  // const sectionIds = ["about", "projects", "experience", "contacts"];
  // const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="bg-slate-950 w-16 h-full fixed left-0 top-0 z-10 flex flex-col justify-center">
      <div className="flex flex-col space-y-8">
        <div
          className={`flex justify-center items-center w-16 h-16 ${
            activeSection === "about" ? "text-black" : "text-gray-700"
          } hover:text-black transform rotate-90`}
        >
          <a href="#about">About</a>
        </div>

        <div
          className={`flex justify-center items-center w-16 h-16 ${
            activeSection === "projects" ? "text-black" : "text-gray-700"
          } hover:text-black transform rotate-90`}
        >
          <a href="#projects">Projects</a>
        </div>

        <div
          className={`flex justify-center items-center w-16 h-16 ${
            activeSection === "experience" ? "text-black" : "text-gray-700"
          } hover:text-black transform rotate-90`}
        >
          <a href="#experience">Experience</a>
        </div>

        <div
          className={`flex justify-center items-center w-16 h-16 ${
            activeSection === "contacts" ? "text-black" : "text-gray-700"
          } hover:text-black transform rotate-90`}
        >
          <a href="#contacts">Contacts</a>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
