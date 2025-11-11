import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Policies() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold">Policies</h1>

          <Tabs defaultValue="returns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="returns" className="prose dark:prose-invert max-w-none">
              <h2>Return Policy</h2>
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy
                with your order, you can return it within 30 days for a full refund.
              </p>

              <h3>Return Conditions</h3>
              <ul>
                <li>Items must be unused and in their original packaging</li>
                <li>All tags and labels must be attached</li>
                <li>Proof of purchase is required</li>
                <li>Some items may be non-returnable (e.g., personalized items)</li>
              </ul>

              <h3>How to Return</h3>
              <ol>
                <li>Contact our customer service team to initiate a return</li>
                <li>We'll send you a prepaid return shipping label</li>
                <li>Pack the item securely and attach the label</li>
                <li>Drop off at any authorized shipping location</li>
                <li>You'll receive your refund within 5-7 business days after we receive the item</li>
              </ol>
            </TabsContent>

            <TabsContent value="warranty" className="prose dark:prose-invert max-w-none">
              <h2>Warranty Policy</h2>
              <p>
                All products sold on our store come with a manufacturer's warranty. The warranty
                period and terms vary by product and brand.
              </p>

              <h3>Warranty Coverage</h3>
              <ul>
                <li>Manufacturing defects</li>
                <li>Material defects</li>
                <li>Workmanship issues</li>
              </ul>

              <h3>What's Not Covered</h3>
              <ul>
                <li>Normal wear and tear</li>
                <li>Damage from misuse or abuse</li>
                <li>Unauthorized modifications</li>
                <li>Cosmetic damage that doesn't affect functionality</li>
              </ul>

              <h3>Making a Warranty Claim</h3>
              <p>
                To make a warranty claim, contact our customer service team with your order number
                and a description of the issue. We'll guide you through the warranty claim process
                and work with the manufacturer to resolve the issue.
              </p>
            </TabsContent>

            <TabsContent value="privacy" className="prose dark:prose-invert max-w-none">
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. This policy explains how we collect, use, and
                protect your personal information.
              </p>

              <h3>Information We Collect</h3>
              <ul>
                <li>Name and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (securely processed by our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Website usage data</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Send promotional emails (you can opt out anytime)</li>
                <li>Improve our products and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>

              <h3>Data Protection</h3>
              <p>
                We use industry-standard security measures to protect your personal information.
                All payment transactions are encrypted and processed through secure payment gateways.
                We never store your complete credit card information.
              </p>

              <h3>Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information at any time.
                Contact our customer service team to exercise these rights.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
