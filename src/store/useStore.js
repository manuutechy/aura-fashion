import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,
      isWishlistOpen: false,
      toasts: [],

      // Toast Actions
      addToast: (message, type = "success") => {
        const id = Date.now().toString();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },

      // Cart Actions
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),

      addToCart: (product, size) => {
        if (!product.sizes.includes("O/S") && !size) {
          get().addToast("Please select a size before adding to cart.", "error");
          return false;
        }

        const selectedSize = size || "O/S";
        
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id && item.size === selectedSize
          );

          let newCart;
          if (existingItemIndex > -1) {
            newCart = state.cart.map((item, idx) =>
              idx === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newCart = [...state.cart, { product, size: selectedSize, quantity: 1 }];
          }

          return { cart: newCart, isCartOpen: true };
        });

        get().addToast(`Added ${product.name} (${selectedSize}) to your cart.`);
        return true;
      },

      removeFromCart: (productId, size) => {
        set((state) => {
          const item = state.cart.find(
            (i) => i.product.id === productId && i.size === size
          );
          const newCart = state.cart.filter(
            (i) => !(i.product.id === productId && i.size === size)
          );
          
          if (item) {
            // Trigger side-effect toast inside next tick or outside return
            setTimeout(() => {
              get().addToast(`Removed ${item.product.name} from cart.`, "info");
            }, 0);
          }
          return { cart: newCart };
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // Wishlist Actions
      toggleWishlist: (product) => {
        set((state) => {
          const isFav = state.wishlist.includes(product.id);
          const newWishlist = isFav
            ? state.wishlist.filter((id) => id !== product.id)
            : [...state.wishlist, product.id];
          
          setTimeout(() => {
            get().addToast(
              isFav
                ? `Removed ${product.name} from your wishlist.`
                : `Added ${product.name} to your wishlist.`,
              isFav ? "info" : "success"
            );
          }, 0);

          return { wishlist: newWishlist };
        });
      },
    }),
    {
      name: "aura-nairobi-storage", // local storage key
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), // only persist cart and wishlist
    }
  )
);
