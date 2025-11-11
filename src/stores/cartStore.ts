import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  variant?: Record<string, string>;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item, qty = 1) => {
        const items = get().items;
        const variantKey = item.variant ? JSON.stringify(item.variant) : "";
        const existingItem = items.find(
          (i) =>
            i.productId === item.productId &&
            JSON.stringify(i.variant || {}) === variantKey
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id ? { ...i, qty: i.qty + qty } : i
            ),
          });
          toast.success("Updated quantity in cart");
        } else {
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${Date.now()}`,
            qty,
          };
          set({ items: [...items, newItem] });
          toast.success("Added to cart");
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Removed from cart");
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      get subtotal() {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },

      get tax() {
        return get().subtotal * 0.1; // 10% tax
      },

      get total() {
        return get().subtotal + get().tax;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
