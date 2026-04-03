function Intro() {
  return (
    <section className="max-w-4xl w-full pt-36 pl-8 pr-3 md:pr-12 lg:pl-10 mb-4 min-h-screen">
      <p className="text-green-400 pb-4">Hi, my name is</p>
      <p className="text-4xl md:text-6xl font-extrabold">
        Victor Kimani<span className="text-green-400">.</span>
      </p>
      <p className="text-xl font-light py-3">
        <span className="text-green-400 font-bold text-2xl">Builder | Founder</span>
      </p>
      <div className="text-slate-400 space-y-3 max-w-2xl">
        <p>I build systems that think, adapt, and solve real problems.</p>
        <p>
          My work spans AI agents, full-stack applications, and tools designed
          for real-world use, not just demos.
        </p>
      </div>
    </section>
  );
}

export default Intro;
