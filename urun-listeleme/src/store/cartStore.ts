import { create } from "zustand";
import type { Product } from "../types/product";

export interface CartItem extends Product {
    quantity: number;
    addedAt: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (product: Product): void =>
        set((state) => {
            const exists = state.items.find((i) => i.id === product.id);
            if (exists) {
                return {
                    items: state.items.map((i) =>
                        i.id === product.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return {
                items: [
                    { ...product, quantity: 1, addedAt: Date.now() },
                    ...state.items,
                ],
            };
        }),
    removeFromCart: (id: number): void =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    updateQuantity: (id: number, qty: number): void =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: qty } : i
            ),
        })),
    clearCart: (): void => set({ items: [] }),
}));
