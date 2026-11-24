import ProductCard from '../molecules/ProductCard';

function ProductGrid({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
        <p className="text-sm font-medium text-slate-600">
          Tidak ada produk yang ditemukan.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Coba ubah kata kunci pencarian atau tambahkan produk baru.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
    </div>
  );
}

export default ProductGrid;