export interface Item {
  id: string;
  category: string;
  item: string;
  price: string;
  image_url: string;
}

export const uid = () =>
  crypto.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
