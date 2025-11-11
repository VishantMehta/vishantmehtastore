import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

type RecentProduct = Pick<Product, "id" | "title" | "slug" | "price" | "images">;

type RecentlyViewedStore = {
  items: RecentProduct[];
  addItem: (item: RecentProduct) => void;
};

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== item.id);
          return { items: [item, ...filtered].slice(0, 8) };
        });
      },
    }),
    {
      name: "recently-viewed-storage",
    }
  )
);
