import { Link } from 'react-router-dom';
import { formatRupiah } from '../../data/product/model/productModel';
import Button from '../atoms/Button';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-400">ID: {product.id}</span>
          <Link
            to={`/products/${product.id}`}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Detail &rarr;
          </Link>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="block text-base font-bold text-slate-900 hover:text-primary transition-colors mb-1"
        >
          {product.name}
        </Link>

        <p className="text-sm font-bold text-primary mb-4">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="outline-primary" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onDelete}>
          Hapus
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;