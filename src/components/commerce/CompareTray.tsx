import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCompare } from "@/hooks/useCompare";
import { motion, AnimatePresence } from "framer-motion";

export function CompareTray() {
  const { items, removeItem, clearAll } = useCompare();
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 right-4 z-40 bg-card rounded-2xl shadow-lg border p-4 max-w-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Compare ({items.length}/3)
          </h3>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear
          </Button>
        </div>

        <div className="flex gap-2 mb-3">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setIsOpen(true)}
          className="w-full"
          disabled={items.length < 2}
        >
          Compare Now
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Comparison</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="space-y-4">
                <Link to={`/products/${item.slug}`} onClick={() => setIsOpen(false)}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </Link>
                <div className="space-y-2">
                  <Link
                    to={`/products/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="font-semibold hover:text-primary line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div className="text-lg font-bold">${item.price}</div>
                  <div className="text-sm text-muted-foreground">Rating: {item.rating}/5</div>
                  <div className="text-sm text-muted-foreground">Category: {item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
