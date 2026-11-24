import Input from '../atoms/Input';

function SearchBar({ value, onChange, totalShown, placeholder = 'Cari nama produk...' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div className="w-full sm:max-w-sm">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      <span className="text-xs font-medium text-slate-500">
        {totalShown} produk
      </span>
    </div>
  );
}

export default SearchBar;