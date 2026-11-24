import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';

function PageLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Manajemen Produk &bull; Pemrograman Web
      </footer>
    </div>
  );
}

export default PageLayout;