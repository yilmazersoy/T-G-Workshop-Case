import { create } from "zustand";
import type { Product } from "../types/product";

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: async (): Promise<void> => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data: Product[] = await res.json();
            set({ products: data, loading: false });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },
}));
