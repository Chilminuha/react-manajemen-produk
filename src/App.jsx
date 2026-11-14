import { useState } from 'react';
import { initialProducts } from './data/initialProducts';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (product) => {
    alert(`Edit produk: ${product.name}`);
  };

  const handleDeleteClick = (product) => {
    alert(`Hapus produk: ${product.name}`);
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn-primary">
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
            onEdit={() => handleEditClick(product)}
            onDelete={() => handleDeleteClick(product)}
          />
        ))}
      </main>

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </div>
  );
}

export default App;