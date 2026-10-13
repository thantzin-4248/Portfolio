import { Outlet, useNavigation } from 'react-router';
import Navbar from '../components/Navbar';

function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <>
      <Navbar />

      {isNavigating && (
        <p role="status" className="bg-blue-50 px-6 py-2 text-sm text-blue-700">
          Loading page...
        </p>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Portfolio
      </footer>
    </>
  );
}

export default RootLayout;