
function Hero({ name, role, description }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-slate-950 px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/portfolio.png')",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-slate-950/80"
      />

      {/* Optional cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96"
      />

      {/* Hero content */}
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-5 font-semibold uppercase tracking-widest text-cyan-400">
            {role}
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-cyan-400">{name}</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Explore My Work
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
