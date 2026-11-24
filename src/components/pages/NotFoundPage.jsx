import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center shadow-xs my-6">
      <p className="text-5xl font-extrabold text-primary mb-3">404</p>
      <h1 className="text-xl font-bold text-slate-900 mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        Maaf, alamat URL yang Anda tuju tidak terdaftar atau telah dipindahkan.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
      >
        Kembali ke Daftar Produk
      </Link>
    </div>
  );
}

export default NotFoundPage;