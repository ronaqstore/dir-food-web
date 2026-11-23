'use client';

import * as React from 'react';
import { AppError } from '@/lib/errors';
import type { ChildrenProps } from '@/types/common';
import type {
  CartItem,
  CartState,
  AddItemPayload,
  CartContextValue,
  ValidatedPriceSyncLine
} from '../types';

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
  } catch (error) {
    const _fallback = error;
  }
  return { restaurant: null, items: [] };
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: ChildrenProps) {
  const [cartState, setCartState] = React.useState<CartState>({ restaurant: null, items: [] });
  const [pendingConflict, setPendingConflict] = React.useState<AddItemPayload | null>(null);

  React.useEffect(() => {
    const stored = getStoredCart();
    if (stored.restaurant || (stored.items && stored.items.length > 0)) {
      setCartState(stored);
    }
  }, []);

  const saveCart = React.useCallback((nextState: CartState) => {
    setCartState(nextState);
    try {
      if (nextState.items.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      }
    } catch (error) {
      const _fallback = error;
    }
  }, []);

  const addItemDirect = React.useCallback((payload: AddItemPayload) => {
    const { restaurant, item, variant, addons = [], quantity = 1 } = payload;
    const sortedAddons = [...addons].sort((a, b) => a.id.localeCompare(b.id));
    const addonsSuffix = sortedAddons.length > 0 ? `:${sortedAddons.map((a) => a.id).join(',')}` : '';
    const key = `${item.id}:${variant?.id || 'base'}${addonsSuffix}`;
    const basePrice = (variant ? variant.price : (item.price ?? 0)) || 0;
    const addonsTotal = sortedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
    const unitPrice = Math.max(0, basePrice + addonsTotal);

    setCartState((prev) => {
      const isSameRestaurant = prev.restaurant?.slug === restaurant.slug;
      const currentItems = isSameRestaurant ? [...prev.items] : [];

      const safeQtyToAdd = Math.min(50, Math.max(1, quantity));
      const existingIndex = currentItems.findIndex((i) => i.key === key);
      if (existingIndex > -1) {
        const existing = currentItems[existingIndex];
        if (existing) {
          currentItems[existingIndex] = {
            ...existing,
            quantity: Math.min(50, existing.quantity + safeQtyToAdd)
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
          quantity: safeQtyToAdd,
          imageUrl: item.imageUrl,
          addons: sortedAddons.length > 0 ? sortedAddons : undefined
        });
      }

      const nextState = {
        restaurant,
        items: currentItems
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch (error) {
        const _fallback = error;
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
      const matchKey = (itemKey: string) =>
        itemKey === key || itemKey === `${key}:` || `${itemKey}:` === key;
      let updatedItems: CartItem[];
      if (quantity <= 0) {
        updatedItems = prev.items.filter((i) => !matchKey(i.key));
      } else {
        const cappedQty = Math.min(50, quantity);
        updatedItems = prev.items.map((i) => (matchKey(i.key) ? { ...i, quantity: cappedQty } : i));
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
      } catch (error) {
        const _fallback = error;
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

  const syncValidatedPrices = React.useCallback(
    (lines: ValidatedPriceSyncLine[]) => {
      setCartState((prev) => {
        let changed = false;
        const updated = prev.items.map((cartItem) => {
          const matching = lines.find(
            (l) => l.menuItemId === cartItem.itemId && (l.variantId ?? undefined) === cartItem.variantId
          );
          if (matching && matching.unitPrice !== cartItem.unitPrice) {
            changed = true;
            return { ...cartItem, unitPrice: matching.unitPrice };
          }
          return cartItem;
        });
        if (!changed) return prev;
        const nextState = { ...prev, items: updated };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch (error) {
          const _fallback = error;
        }
        return nextState;
      });
    },
    []
  );

  const getItemQuantity = React.useCallback(
    (itemId: string, variantId?: string): number => {
      return cartState.items
        .filter((i) => i.itemId === itemId && (!variantId || i.variantId === variantId))
        .reduce((sum, i) => sum + i.quantity, 0);
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
      syncValidatedPrices,
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
      syncValidatedPrices,
      pendingConflict,
      resolveConflict
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new AppError('useCart must be used within a CartProvider');
  }
  return context;
}
