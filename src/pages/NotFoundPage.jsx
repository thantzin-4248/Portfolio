import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section className="px-6 py-24 text-center">
      <p className="mb-3 font-semibold text-blue-600">404 Error</p>

      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Page not found
      </h1>

      <p className="mb-8 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFoundPage;