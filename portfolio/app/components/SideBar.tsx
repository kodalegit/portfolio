"use client";

function SideBar({ activeSection }: { activeSection: string }) {
  return (
    <nav className="bg-slate-950 w-16 h-full fixed left-0 top-0 z-10">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex justify-center items-center w-10 h-10 mt-2 rounded-sm bg-gray-600 font-extrabold">
          VK<span className="text-green-400">.</span>
        </div>
        <div
          className={`flex justify-center items-center w-24 h-16 ${
            activeSection === "about"
              ? "text-slate-300 bg-slate-900 border-t-2 border-green-400"
              : "text-slate-400"
          } hover:text-slate-300 hover:bg-slate-900 hover:border-t-2 hover:border-green-400 transform rotate-90`}
        >
          <a href="#about">About</a>
        </div>

        <div
          className={`flex justify-center items-center w-24 h-16 ${
            activeSection === "projects"
              ? "text-slate-300 bg-slate-900 border-t-2 border-green-400"
              : "text-slate-400"
          } hover:text-slate-300 hover:bg-slate-900 hover:border-t-2 hover:border-green-400 transform rotate-90`}
        >
          <a href="#projects">Projects</a>
        </div>

        <div
          className={`flex justify-center items-center w-28 h-16 ${
            activeSection === "experience"
              ? "text-slate-300 bg-slate-900 border-t-2 border-green-400"
              : "text-slate-400"
          } hover:text-slate-300 hover:bg-slate-900 hover:border-t-2 hover:border-green-400 transform rotate-90`}
        >
          <a href="#experience">Experience</a>
        </div>

        <div
          className={`flex justify-center items-center w-24 h-16 ${
            activeSection === "contacts"
              ? "text-slate-300 bg-slate-900 border-t-2 border-green-400"
              : "text-slate-400"
          } hover:text-slate-300 hover:bg-slate-900 hover:border-t-2 hover:border-green-400 transform rotate-90`}
        >
          <a href="#contacts">Contacts</a>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
