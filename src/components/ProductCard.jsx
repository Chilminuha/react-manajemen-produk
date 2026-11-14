import { formatRupiah } from '../data/initialProducts';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formatRupiah(product.price)}</p>

      <div className="card-actions">
        <button type="button" className="btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={onDelete}>
          Hapus
        </button>
      </div>
    </div>
  );
}

export default ProductCard;