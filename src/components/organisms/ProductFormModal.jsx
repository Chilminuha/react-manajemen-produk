import { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

function ProductFormModal({ initialData, onSave, onClose, isSubmitting = false }) {
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

    setError('');
    onSave({
      id: isEdit ? initialData.id : null,
      name: name.trim(),
      price: numericPrice,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl leading-none cursor-pointer"
          aria-label="Tutup modal"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold text-slate-900">
          {isEdit ? 'Edit Produk' : 'Tambah Produk'}
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          {isEdit
            ? 'Perbarui informasi produk yang dipilih.'
            : 'Masukkan informasi produk baru.'}
        </p>

        {isEdit && (
          <p className="text-xs text-slate-400 mb-3">ID: {initialData.id}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="product-name"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Nama Produk
            </label>
            <Input
              id="product-name"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="product-price"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Harga (Rp)
            </label>
            <Input
              id="product-price"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isSubmitting}
            />
            <p className={`text-xs mt-1.5 ${error ? 'text-red-600' : 'text-slate-500'}`}>
              {error || 'Harga harus lebih dari 0.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting
                ? 'Menyimpan...'
                : isEdit
                ? 'Simpan Perubahan'
                : 'Simpan Produk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;