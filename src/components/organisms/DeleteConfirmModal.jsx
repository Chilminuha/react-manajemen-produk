import { formatRupiah } from '../../data/product/model/productModel';
import Button from '../atoms/Button';

function DeleteConfirmModal({ product, onConfirm, onClose, isDeleting = false }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl text-center">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl leading-none cursor-pointer"
          aria-label="Tutup modal"
        >
          &times;
        </button>

        <div
          className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mx-auto mb-3"
          aria-hidden="true"
        >
          🗑️
        </div>

        <h2 className="text-lg font-bold text-slate-900">Hapus Produk?</h2>
        <p className="text-xs text-slate-500 mt-1">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left mt-4">
          <span className="block text-xs text-slate-400 mb-0.5">
            ID: {product.id}
          </span>
          <p className="text-sm font-bold text-slate-900">{product.name}</p>
          <p className="text-sm font-bold text-primary mt-0.5">
            {formatRupiah(product.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;