import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/products" className="text-lg font-bold tracking-tight">
          Manajemen Produk
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Daftar Produk
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;