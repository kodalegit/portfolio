"use client";

function SideBar({ activeSection }: { activeSection: string }) {
  const navLink = (id: string, label: string) => {
    const isActive = activeSection === id;
    return (
      <div className="h-24 flex items-center justify-center">
        <div
          className={`flex justify-center items-center w-32 h-10 origin-center rotate-90 text-[10px] tracking-[0.24em] uppercase whitespace-nowrap transition-colors duration-300 ${
            isActive
              ? "text-green-400"
              : "text-slate-600 hover:text-slate-400"
          }`}
        >
          <a href={`#${id}`}>{label}</a>
        </div>
      </div>
    );
  };

  return (
    <nav className="w-20 h-full fixed left-0 top-0 z-10 border-r border-slate-800/40">
      <div className="flex flex-col items-center h-full py-4">
        <a
          href="#"
          className="font-display font-bold text-sm tracking-tight"
        >
          VK<span className="text-green-400">.</span>
        </a>
        <div className="flex-1 flex flex-col items-center justify-center gap-10">
          {navLink("about", "About")}
          {navLink("projects", "Projects")}
          {navLink("experience", "Experience")}
          {navLink("contacts", "Contact")}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
