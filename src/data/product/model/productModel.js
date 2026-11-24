export const mapProduct = (raw) => ({
  id: raw.id,
  name: raw.name ?? '',
  price: Number(raw.price ?? 0),
});

export const formatRupiah = (amount) => {
  return `Rp${Number(amount).toLocaleString('id-ID')}`;
};