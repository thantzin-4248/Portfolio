import { Link, NavLink } from "react-router";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-4 focus:ring-offset-slate-950 ${
      isActive ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 shadow-lg shadow-black/10 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
        aria-label="Main navigation"
      >
        {/* Portfolio logo */}
        <Link
          to="/"
          className="rounded-md text-lg font-bold tracking-tight text-white transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-xl"
        >
          My<span className="text-cyan-400">Portfolio</span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-5 sm:gap-8">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
