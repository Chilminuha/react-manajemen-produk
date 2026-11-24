import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productRepository } from '../../data/product/repository/productRepository';
import { formatRupiah } from '../../data/product/model/productModel';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundMessage, setNotFoundMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setNotFoundMessage('');
        const data = await productRepository.getProductById(id);
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) {
          setProduct(null);
          setNotFoundMessage(
            err.status === 404
              ? `Produk dengan ID "${id}" tidak ditemukan.`
              : err.message || `Produk dengan ID "${id}" tidak dapat dimuat.`
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
        <p className="text-sm font-medium text-slate-600">
          Memuat detail produk...
        </p>
      </div>
    );
  }

  if (notFoundMessage || !product) {
    return (
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
        <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-3">
          Produk Tidak Ditemukan
        </span>
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Data Produk Tidak Tersedia
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {notFoundMessage || 'Produk yang Anda cari tidak terdaftar atau telah dihapus.'}
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium mb-3">
          ID Produk: {product.id}
        </span>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {product.name}
        </h1>

        <p className="text-xl font-bold text-primary mb-6">
          {formatRupiah(product.price)}
        </p>

        <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-1">
          <p>Status: Tersedia di katalog database</p>
          <p>Endpoint: GET /products/{product.id}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;