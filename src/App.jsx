import { useState } from 'react';
import { initialProducts, formatRupiah } from './data/initialProducts';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div key={product.id} className="product-card">
            <span className="product-id">ID: {product.id}</span>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{formatRupiah(product.price)}</p>
          </div>
        ))}
      </main>

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </div>
  );
}

export default App;