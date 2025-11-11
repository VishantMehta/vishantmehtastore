import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer free standard shipping on all orders over $50. Standard shipping typically takes 5-7 business days. Expedited shipping options are available at checkout for faster delivery.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for items in their original condition with tags attached. Simply contact our customer service team to initiate a return, and we'll provide you with a prepaid shipping label.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. You can see the shipping cost for your location at checkout.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and other secure payment methods. All transactions are encrypted and secure.",
    },
    {
      question: "Do you offer warranty on products?",
      answer: "Yes, all products come with the manufacturer's warranty. The warranty period varies by product and is listed on each product page. We also offer extended warranty options at checkout.",
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After that, the order may have already been processed and shipped.",
    },
    {
      question: "Do you have a price match guarantee?",
      answer: "Yes! If you find a lower price on an identical item from a competing retailer, we'll match it. Contact us within 7 days of purchase with proof of the lower price.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our products and services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
