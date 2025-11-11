import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

type WishlistItem = Pick<Product, "id" | "title" | "slug" | "price" | "images" | "rating" | "stock">;

type WishlistStore = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggle: (item: WishlistItem) => void;
};

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) {
            return state;
          }
          toast({ title: "Added to wishlist", description: item.title });
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            toast({ title: "Removed from wishlist", description: item.title });
          }
          return { items: state.items.filter((i) => i.id !== id) };
        });
      },
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },
      toggle: (item) => {
        if (get().isInWishlist(item.id)) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
