import { useState } from 'react';
import { initialProducts } from './data/initialProducts';
import ProductCard from './components/ProductCard';
import ProductFormModal from './components/ProductFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

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
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData) => {
    if (productData.id) {
      setProducts((prev) =>
        prev.map((item) => (item.id === productData.id ? productData : item))
      );
    } else {
      const nextId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [...prev, { ...productData, id: nextId }]);
    }
    handleCloseForm();
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    setProducts((prev) =>
      prev.filter((item) => item.id !== deletingProduct.id)
    );
    setDeletingProduct(null);
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn-primary" onClick={handleOpenAdd}>
          + Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="product-count">{filteredProducts.length} produk</span>
      </div>

      <main className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => handleOpenEdit(product)}
            onDelete={() => setDeletingProduct(product)}
          />
        ))}
      </main>

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {isFormOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseForm}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}

export default App;