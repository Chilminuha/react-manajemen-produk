import { formatRupiah } from '../data/initialProducts';

function DeleteConfirmModal({ product, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box delete-modal">
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="trash-badge" aria-hidden="true">
          🗑️
        </div>

        <h2 className="modal-title">Hapus Produk?</h2>
        <p className="modal-subtitle">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-preview">
          <span className="product-id">ID: {product.id}</span>
          <p className="product-name">{product.name}</p>
          <p className="product-price" style={{ marginBottom: 0 }}>
            {formatRupiah(product.price)}
          </p>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;