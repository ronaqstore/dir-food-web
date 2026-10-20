'use client';

import * as React from 'react';
import type { CartItem, CartRestaurant, CartState } from '../types';

interface AddItemPayload {
  restaurant: CartRestaurant;
  item: {
    id: string;
    name: string;
    imageUrl?: string | null;
    price: number;
  };
  variant?: {
    id: string;
    name: string;
    price: number;
  };
  quantity?: number;
}

interface CartContextValue {
  restaurant: CartRestaurant | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (payload: AddItemPayload) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string, variantId?: string) => number;
  pendingConflict: AddItemPayload | null;
  resolveConflict: (acceptNew: boolean) => void;
}

const STORAGE_KEY = 'dir_food_cart';

function getStoredCart(): CartState {
  if (typeof window === 'undefined') {
    return { restaurant: null, items: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { restaurant: null, items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
  } catch {
    // fallback
  }
  return { restaurant: null, items: [] };
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, setCartState] = React.useState<CartState>(getStoredCart);
  const [pendingConflict, setPendingConflict] = React.useState<AddItemPayload | null>(null);

  const saveCart = React.useCallback((nextState: CartState) => {
    setCartState(nextState);
    try {
      if (nextState.items.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      }
    } catch {
      // storage error ignored
    }
  }, []);

  const addItemDirect = React.useCallback((payload: AddItemPayload) => {
    const { restaurant, item, variant, quantity = 1 } = payload;
    const key = `${item.id}:${variant?.id || 'base'}`;
    const unitPrice = variant ? variant.price : item.price;

    setCartState((prev) => {
      const isSameRestaurant = prev.restaurant?.slug === restaurant.slug;
      const currentItems = isSameRestaurant ? [...prev.items] : [];

      const existingIndex = currentItems.findIndex((i) => i.key === key);
      if (existingIndex > -1) {
        const existing = currentItems[existingIndex];
        if (existing) {
          currentItems[existingIndex] = {
            ...existing,
            quantity: existing.quantity + quantity
          };
        }
      } else {
        currentItems.push({
          key,
          itemId: item.id,
          variantId: variant?.id,
          name: item.name,
          variantName: variant?.name,
          unitPrice,
          quantity,
          imageUrl: item.imageUrl
        });
      }

      const nextState = {
        restaurant,
        items: currentItems
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore
      }
      return nextState;
    });
  }, []);

  const addItem = React.useCallback(
    (payload: AddItemPayload) => {
      if (
        cartState.restaurant &&
        cartState.restaurant.slug !== payload.restaurant.slug &&
        cartState.items.length > 0
      ) {
        setPendingConflict(payload);
        return;
      }
      addItemDirect(payload);
    },
    [cartState.restaurant, cartState.items.length, addItemDirect]
  );

  const resolveConflict = React.useCallback(
    (acceptNew: boolean) => {
      if (acceptNew && pendingConflict) {
        addItemDirect(pendingConflict);
      }
      setPendingConflict(null);
    },
    [pendingConflict, addItemDirect]
  );

  const updateQuantity = React.useCallback((key: string, quantity: number) => {
    setCartState((prev) => {
      let updatedItems: CartItem[];
      if (quantity <= 0) {
        updatedItems = prev.items.filter((i) => i.key !== key);
      } else {
        updatedItems = prev.items.map((i) => (i.key === key ? { ...i, quantity } : i));
      }

      const nextState = {
        restaurant: updatedItems.length === 0 ? null : prev.restaurant,
        items: updatedItems
      };
      try {
        if (nextState.items.length === 0) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        }
      } catch {
        // ignore
      }
      return nextState;
    });
  }, []);

  const removeItem = React.useCallback(
    (key: string) => {
      updateQuantity(key, 0);
    },
    [updateQuantity]
  );

  const clearCart = React.useCallback(() => {
    saveCart({ restaurant: null, items: [] });
  }, [saveCart]);

  const getItemQuantity = React.useCallback(
    (itemId: string, variantId?: string): number => {
      const key = `${itemId}:${variantId || 'base'}`;
      const item = cartState.items.find((i) => i.key === key);
      return item ? item.quantity : 0;
    },
    [cartState.items]
  );

  const itemCount = React.useMemo(
    () => cartState.items.reduce((acc, item) => acc + item.quantity, 0),
    [cartState.items]
  );

  const subtotal = React.useMemo(
    () => cartState.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cartState.items]
  );

  const value = React.useMemo(
    () => ({
      restaurant: cartState.restaurant,
      items: cartState.items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
      pendingConflict,
      resolveConflict
    }),
    [
      cartState.restaurant,
      cartState.items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
      pendingConflict,
      resolveConflict
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
