import { useEffect, useState } from 'react';
import { productRepository } from '../../data/product/repository/productRepository';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import ProductGrid from '../organisms/ProductGrid';
import ProductFormModal from '../organisms/ProductFormModal';
import DeleteConfirmModal from '../organisms/DeleteConfirmModal';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await productRepository.getProducts();
      setProducts(data);
    } catch (err) {
      setErrorMessage(
        err.message || 'Gagal memuat daftar produk. Pastikan server backend sudah berjalan.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isSubmitting) return;
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      if (productData.id) {
        const updated = await productRepository.updateProduct(productData.id, {
          name: productData.name,
          price: productData.price,
        });
        setProducts((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      } else {
        const created = await productRepository.createProduct({
          name: productData.name,
          price: productData.price,
        });
        setProducts((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menyimpan data produk ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      await productRepository.deleteProduct(deletingProduct.id);
      setProducts((prev) =>
        prev.filter((item) => item.id !== deletingProduct.id)
      );
      setDeletingProduct(null);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menghapus produk dari server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daftar Produk</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar produk dan harga yang terhubung dengan backend API.
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd}>
          + Tambah Produk
        </Button>
      </header>

      {errorMessage && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-red-700">{errorMessage}</p>
          <Button variant="outline-danger" size="sm" onClick={fetchProducts}>
            Coba Lagi
          </Button>
        </div>
      )}

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        totalShown={filteredProducts.length}
      />

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-sm font-medium text-slate-600">
            Memuat data produk dari server...
          </p>
        </div>
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={(product) => setDeletingProduct(product)}
          />

          <p className="mt-5 text-xs text-slate-500">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      )}

      {isFormOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onConfirm={handleConfirmDelete}
          onClose={() => !isSubmitting && setDeletingProduct(null)}
          isDeleting={isSubmitting}
        />
      )}
    </div>
  );
}

export default ProductsPage;