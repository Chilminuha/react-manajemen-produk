import { useState } from 'react';

function ProductFormModal({ initialData, onSave, onClose }) {
  const isEdit = Boolean(initialData);
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [price, setPrice] = useState(initialData ? String(initialData.price) : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPrice = Number(price);

    if (!name.trim()) {
      setError('Nama produk wajib diisi.');
      return;
    }

    if (!price || numericPrice <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }

    onSave({
      id: isEdit ? initialData.id : null,
      name: name.trim(),
      price: numericPrice,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">
          {isEdit ? 'Edit Produk' : 'Tambah Produk'}
        </h2>
        <p className="modal-subtitle">
          {isEdit
            ? 'Perbarui informasi produk yang dipilih.'
            : 'Masukkan informasi produk baru.'}
        </p>

        {isEdit && (
          <p className="product-id" style={{ marginBottom: '12px' }}>
            ID: {initialData.id}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product-name">Nama Produk</label>
            <input
              id="product-name"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Harga (Rp)</label>
            <input
              id="product-price"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className={error ? 'error-text' : 'helper-text'}>
              {error || 'Harga harus lebih dari 0.'}
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;