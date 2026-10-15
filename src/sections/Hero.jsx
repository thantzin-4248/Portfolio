import { motion, useReducedMotion } from "motion/react";

const technologies = ["React", "Laravel", "PHP", "MySQL", "REST APIs"];

const principles = [
  {
    number: "01",
    title: "Understand",
    description: "Business needs and user workflows",
  },
  {
    number: "02",
    title: "Architect",
    description: "Maintainable and reusable solutions",
  },
  {
    number: "03",
    title: "Deliver",
    description: "Reliable, user-focused applications",
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 };

  const revealTarget = {
    opacity: 1,
    y: 0,
  };

  const revealTransition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0.15 : 0.7,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#070b14] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-blue-500/[0.07] blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.4, 0.8, 0.4],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Left: professional introduction */}
        <div>
          <motion.div
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0)}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-cyan-400" />

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300 sm:text-sm">
              Software Development / Problem Solving
            </p>
          </motion.div>

          <motion.h1
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0.12)}
            className="max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Turning business challenges into{" "}
            <span className="text-cyan-300">useful software.</span>
          </motion.h1>

          <motion.p
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0.24)}
            className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
          >
            I'm a developer focused on building practical web applications with
            React, Laravel, and modern web technologies. I care about
            understanding requirements, writing maintainable code, and creating
            reliable experiences that solve real problems.
          </motion.p>

          {/* Technology tags */}
          <motion.div
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0.34)}
            className="mt-7 flex flex-wrap gap-2"
          >
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-slate-300 sm:text-sm"
              >
                {technology}
              </span>
            ))}
          </motion.div>

          {/* Calls to action */}
          <motion.div
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0.44)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="/projects"
              whileHover={
                shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
            >
              Explore my work
              <span aria-hidden="true">↗</span>
            </motion.a>

            <motion.a
              href="#about"
              whileHover={shouldReduceMotion ? undefined : { x: 3 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Discover my approach
              <span aria-hidden="true">↓</span>
            </motion.a>
          </motion.div>

          <motion.p
            initial={reveal}
            animate={revealTarget}
            transition={revealTransition(0.55)}
            className="mt-8 text-xs leading-6 text-slate-500"
          >
            Focused on thoughtful engineering, practical solutions, and
            continuous improvement.
          </motion.p>
        </div>

        {/* Right: engineering identity panel */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: 30, scale: 0.97 }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={revealTransition(0.25)}
          className="relative mx-auto w-full max-w-lg"
        >
          {/* Decorative orbit */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-5 rounded-[2rem] border border-cyan-400/[0.12]"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 55,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="absolute left-[18%] top-0 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
          </motion.div>

          {/* Main panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-3xl"
            />

            {/* Panel heading */}
            <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  Engineering mindset
                </p>

                <h2 className="mt-2 text-lg font-semibold text-white">
                  From problem to solution
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm text-cyan-300">
                {"</>"}
              </div>
            </div>

            {/* Process steps */}
            <div className="relative mt-6 space-y-3">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.number}
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={revealTransition(0.5 + index * 0.15)}
                  className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-cyan-400/25 hover:bg-cyan-400/[0.035]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 font-mono text-xs text-cyan-300">
                    {principle.number}
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {principle.title}
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-slate-400 sm:text-sm">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code-inspired visual */}
            <div className="relative mt-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#070b14] p-4">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="ml-2 font-mono text-[10px] text-slate-600">
                  engineering-principles.js
                </span>
              </div>

              <pre className="overflow-x-auto font-mono text-xs leading-7 sm:text-sm">
                <code>
                  <span className="text-fuchsia-300">const</span>{" "}
                  <span className="text-cyan-200">solution</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-yellow-200">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-400">clarity:</span>{" "}
                  <span className="text-emerald-300">true</span>,{"\n"}
                  {"  "}
                  <span className="text-slate-400">maintainable:</span>{" "}
                  <span className="text-emerald-300">true</span>,{"\n"}
                  {"  "}
                  <span className="text-slate-400">userFocused:</span>{" "}
                  <span className="text-emerald-300">true</span>
                  {"\n"}
                  <span className="text-yellow-200">{"}"}</span>;
                </code>
              </pre>
            </div>

            {/* Bottom panel footer */}
            <div className="relative mt-5 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Principles over shortcuts
              </span>

              <span className="font-mono text-xs text-cyan-300">
                BUILD / IMPROVE / REPEAT
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-cyan-300 sm:flex"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">
          Scroll to explore
        </span>

        <span aria-hidden="true" className="text-lg">
          ↓
        </span>
      </motion.a>
    </section>
  );
}
