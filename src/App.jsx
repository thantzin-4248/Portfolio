
function App() {
  const developer = {
    name: 'Your Name',
    role: 'React & Laravel Developer',
    description:
      'I build responsive web applications and practical business solutions.',
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium text-cyan-400">
          HELLO, WORLD!
        </p>

        <h1 className="text-4xl font-bold sm:text-6xl">
          I'm {developer.name}
        </h1>

        <h2 className="mt-4 text-2xl text-slate-300">
          {developer.role}
        </h2>

        <p className="mt-6 max-w-2xl leading-8 text-slate-400">
          {developer.description}
        </p>

        <a
          href="#projects"
          className="mt-8 inline-block rounded-lg bg-cyan-400
                     px-6 py-3 font-semibold text-slate-950
                     transition hover:bg-cyan-300"
        >
          View My Projects
        </a>

        <section id="projects" className="mt-24">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <p className="mt-3 text-slate-400">
            We'll build the project gallery in a later lesson.
          </p>
        </section>
      </section>
    </main>
  );
}

export default App;
