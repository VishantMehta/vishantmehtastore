import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/stores/cartStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b glass backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              LUXE
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/products?category=electronics" className="text-sm font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/products?category=fashion" className="text-sm font-medium hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link to="/products?category=home-living" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            {searchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden md:block"
              >
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full"
                    >
                      {totalItems}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </Link>

            {/* User */}
            <Link to="/auth/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/products"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    to="/products?category=electronics"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/products?category=fashion"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/products?category=home-living"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/auth/login"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Account
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
