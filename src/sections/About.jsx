function About() {
  return (
    <section
      id="about"
      className="border-t border-slate-800 bg-slate-900/40 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {/* Section heading */}
          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            Get to Know Me
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            About Me
          </h2>

          {/* Introduction */}
          <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
            I enjoy solving real-world business problems through software
            development. My goal is to build applications that are useful,
            reliable, maintainable, and easy to use.
          </p>

          <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
            I am developing my skills in React, JavaScript, PHP, Laravel,
            databases, and software architecture. I am especially interested in
            understanding business requirements and turning them into practical
            software solutions.
          </p>

          <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
            I believe good software is more than writing code. It also requires
            understanding users, analyzing problems, designing maintainable
            systems, testing carefully, and continuously improving the final
            product.
          </p>
        </div>

        {/* Areas of interest */}
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            "React",
            "JavaScript",
            "PHP",
            "Laravel",
            "MySQL",
            "Software Architecture",
            "Business Analysis",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
