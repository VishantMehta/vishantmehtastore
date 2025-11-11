import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold">About Us</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Welcome to our premium e-commerce store, where quality meets innovation.
              We're passionate about bringing you the finest products from around the world.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              Founded in 2024, we started with a simple mission: to make premium products
              accessible to everyone. What began as a small online store has grown into a
              trusted destination for thousands of customers worldwide.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="space-y-2">
              <li><strong>Quality First:</strong> We carefully curate every product to ensure it meets our high standards.</li>
              <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. We're here to help every step of the way.</li>
              <li><strong>Sustainability:</strong> We're committed to eco-friendly practices and sustainable products.</li>
              <li><strong>Innovation:</strong> We continuously seek out the latest and greatest products to bring to you.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
            <p>
              With a vast selection of products, competitive prices, and exceptional customer service,
              we make online shopping easy and enjoyable. Our secure checkout process and fast shipping
              ensure you get what you need, when you need it.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
