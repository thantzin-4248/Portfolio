import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

const expertise = [
  {
    number: "01",
    title: "Business-Driven Development",
    description:
      "I start by understanding the problem, clarifying requirements, and building software around real user and business needs.",
    tags: ["Requirements", "User workflows", "Problem solving"],
    symbol: "◎",
  },
  {
    number: "02",
    title: "Scalable Application Design",
    description:
      "I organize applications into reusable components and clear architectural layers so features remain easier to maintain and extend.",
    tags: ["Clean code", "Architecture", "Reusability"],
    symbol: "⌘",
  },
  {
    number: "03",
    title: "Reliable Engineering",
    description:
      "I focus on validation, authorization, data integrity, error handling, and testing to make applications more dependable.",
    tags: ["Security", "Testing", "Data integrity"],
    symbol: "↗",
  },
];

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "Git & GitHub", category: "Workflow" },
];

const principles = [
  {
    number: "01",
    title: "Understand before building",
    description:
      "Clarify the problem, identify stakeholders, and turn requirements into practical solutions.",
  },
  {
    number: "02",
    title: "Build for change",
    description:
      "Prefer clear responsibilities, reusable components, and maintainable code over unnecessary complexity.",
  },
  {
    number: "03",
    title: "Deliver with confidence",
    description:
      "Consider edge cases, validate inputs, protect data, and test important user workflows.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ExpertiseCard({ item, index }) {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 180,
    damping: 18,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 180,
    damping: 18,
  });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  function handlePointerMove(event) {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);

    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: "easeOut",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -6, borderColor: "rgba(34, 211, 238, 0.45)" }
      }
      className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-colors duration-300 hover:bg-slate-900 sm:p-7"
    >
      <div className="mb-8 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-2xl text-cyan-300">
          {item.symbol}
        </span>

        <span className="font-mono text-sm text-slate-600">/{item.number}</span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-white">
        {item.title}
      </h3>

      <p className="mt-3 min-h-20 text-sm leading-7 text-slate-400">
        {item.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-cyan-400/70 transition-transform duration-500 group-hover:scale-x-100 sm:left-7 sm:right-7" />
    </motion.article>
  );
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#070b14] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12"
    >
      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-32 -z-10 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -right-48 top-16 -z-10 h-[32rem] w-[32rem] rounded-full border border-cyan-400/[0.09]"
      >
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300/60 shadow-[0_0_25px_rgba(34,211,238,0.7)]" />
        <div className="absolute inset-10 rounded-full border border-dashed border-white/[0.07]" />
      </motion.div>

      <div className="mx-auto max-w-7xl">
        {/* Section introduction */}
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-400" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
              About / The Engineer
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
                I build software that makes{" "}
                <span className="text-cyan-300">complex work</span> feel simple.
              </h2>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-base leading-8 text-slate-400 sm:text-lg">
                I'm a developer interested in the connection between business
                requirements and reliable software. I enjoy understanding how
                people work, designing practical solutions, and building
                applications that are clear, secure, and maintainable.
              </p>

              <a
                href="#engineering-approach"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Explore my approach
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Professional value highlights */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] sm:grid-cols-3">
            {[
              {
                title: "Business first",
                text: "Understand the need",
              },
              {
                title: "Engineering mindset",
                text: "Design for maintainability",
              },
              {
                title: "Quality focused",
                text: "Think beyond happy paths",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`p-6 sm:p-7 ${
                  index !== 0
                    ? "border-t border-white/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <p className="text-base font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Technical expertise */}
        <div className="mt-28 sm:mt-36">
          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
                  What I bring
                </p>

                <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Turning problems into solutions.
                </h3>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-400">
                My focus is not just writing code. It is making thoughtful
                technical decisions that support real application needs.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {expertise.map((item, index) => (
              <ExpertiseCard key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Engineering approach */}
        <div
          id="engineering-approach"
          className="mt-28 grid gap-12 border-t border-white/10 pt-16 sm:mt-36 sm:pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
                My approach
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Good engineering starts before the first line of code.
              </h3>

              <p className="mt-5 max-w-lg leading-8 text-slate-400">
                I aim to understand the context, choose the simplest appropriate
                design, and consider how a feature will behave in the real
                world—not just when everything goes right.
              </p>
            </div>
          </Reveal>

          <div className="space-y-0">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 0.08}>
                <div className="grid grid-cols-[48px_1fr] gap-5 border-b border-white/10 py-7 first:pt-0 sm:grid-cols-[64px_1fr] sm:gap-7">
                  <span className="font-mono text-sm text-cyan-300">
                    {principle.number}
                  </span>

                  <div>
                    <h4 className="text-lg font-semibold text-white sm:text-xl">
                      {principle.title}
                    </h4>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Technology stack */}
        <div className="mt-28 border-t border-white/10 pt-12 sm:mt-36">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Tools of the trade
                </p>

                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Technologies I work with.
                </h3>
              </div>

              <p className="text-sm text-slate-500">
                A growing, practical engineering toolkit.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            {technologies.map((technology, index) => (
              <motion.div
                key={technology.name}
                initial={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.4,
                  delay: shouldReduceMotion ? 0 : (index % 4) * 0.07,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, borderColor: "rgba(34,211,238,0.5)" }
                }
                className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"
              >
                <span className="block text-sm font-medium text-slate-200">
                  {technology.name}
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  {technology.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <Reveal>
          <div className="mt-24 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.045] p-7 sm:mt-32 sm:p-10 lg:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
              The goal
            </p>

            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h3 className="max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
                Build software that solves the right problem—and remains useful
                as the business grows.
              </h3>

              <a
                href="#projects"
                className="inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Explore my projects
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
