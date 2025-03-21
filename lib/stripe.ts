import { Stripe } from "stripe"

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Use the latest API version
})

// Helper function to format price for Stripe (converts dollars to cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

// Helper function to format price for display (converts cents to dollars)
export function formatAmountFromStripe(amount: number): string {
  return (amount / 100).toFixed(2)
}

