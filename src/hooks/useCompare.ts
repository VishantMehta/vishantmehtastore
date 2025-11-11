import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

type CompareItem = Pick<Product, "id" | "title" | "slug" | "price" | "images" | "rating" | "category">;

type CompareStore = {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
};

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          if (state.items.length >= 3) {
            toast({
              title: "Compare limit reached",
              description: "You can only compare up to 3 products",
              variant: "destructive",
            });
            return state;
          }
          if (state.items.find((i) => i.id === item.id)) {
            return state;
          }
          toast({ title: "Added to compare", description: item.title });
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      clearAll: () => set({ items: [] }),
      isInCompare: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: "compare-storage",
    }
  )
);
