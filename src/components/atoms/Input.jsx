function Input({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition ${className}`}
      {...rest}
    />
  );
}

export default Input;