import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { CreditCard, Building2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "razorpay">("stripe");
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setProcessing(true);

    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would:
    // 1. Create order on server
    // 2. Initialize payment with Stripe/Razorpay
    // 3. Handle payment completion
    // 4. Redirect to order confirmation

    toast.success("Order placed successfully!");
    clearCart();
    setProcessing(false);
    navigate("/orders");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 p-6 rounded-2xl bg-card shadow-card"
          >
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 p-6 rounded-2xl bg-card shadow-card"
          >
            <h2 className="text-2xl font-semibold">Shipping Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...register("city")}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  {...register("postalCode")}
                  className={errors.postalCode ? "border-destructive" : ""}
                />
                {errors.postalCode && (
                  <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...register("country")}
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 p-6 rounded-2xl bg-card shadow-card"
          >
            <h2 className="text-2xl font-semibold">Payment Method</h2>

            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-3 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Credit Card (Stripe)</div>
                    <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="razorpay" id="razorpay" />
                <Label htmlFor="razorpay" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <div className="font-medium">UPI/Cards (Razorpay)</div>
                    <div className="text-sm text-muted-foreground">Pay with UPI, cards, net banking</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 p-6 rounded-2xl bg-card shadow-card"
          >
            <h2 className="text-2xl font-semibold">Order Summary</h2>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.title} × {item.qty}
                  </span>
                  <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={processing}>
              {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
