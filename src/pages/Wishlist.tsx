import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: any) => {
    addItem({
      productId: item.id,
      title: item.title,
      slug: item.slug,
      image: item.images[0],
      price: item.price,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center"
          >
            <Heart className="h-12 w-12 text-muted-foreground" />
          </motion.div>
          <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
          <p className="text-muted-foreground">
            Save items you love to your wishlist
          </p>
          <Link to="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          My Wishlist ({items.length})
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card"
              >
                <Link to={`/products/${item.slug}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <div className="p-4 space-y-3">
                  <Link
                    to={`/products/${item.slug}`}
                    className="font-semibold line-clamp-2 hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${item.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
