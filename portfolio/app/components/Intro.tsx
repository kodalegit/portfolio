function Intro() {
  return (
    <section className="max-w-4xl w-full pt-36 pl-8 pr-3 md:pr-12 lg:pl-10 mb-4 min-h-screen flex flex-col justify-center">
      <p className="text-green-400 text-sm tracking-[0.2em] uppercase mb-6">
        Hi, my name is
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
        Victor Kimani<span className="text-green-400">.</span>
      </h1>
      <p className="text-sm tracking-[0.15em] uppercase text-green-400/80 font-medium mt-5 mb-8">
        Builder &mdash; Founder
      </p>
      <div className="text-slate-400 space-y-3 max-w-xl leading-relaxed">
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
