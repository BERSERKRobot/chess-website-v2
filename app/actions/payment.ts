"use server"

import { stripe, formatAmountForStripe } from "@/lib/stripe"

export type PaymentData = {
  name: string
  email: string
  amount: number
  planId: string
  planName: string
  metadata?: Record<string, string>
}

export async function createPaymentIntent(data: PaymentData) {
  try {
    // Validate the payment data
    if (!data.name || !data.email || !data.amount || !data.planId) {
      return {
        success: false,
        message: "Missing required payment information",
      }
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(data.amount),
      currency: "usd",
      // Store metadata about the purchase
      metadata: {
        name: data.name,
        email: data.email,
        planId: data.planId,
        planName: data.planName,
        ...data.metadata,
      },
      receipt_email: data.email,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      message: "Failed to process payment. Please try again later.",
    }
  }
}

export async function handlePaymentSuccess(paymentIntentId: string) {
  try {
    // Retrieve the payment intent to verify it was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return {
        success: false,
        message: "Payment has not been completed",
      }
    }

    // Here you would typically:
    // 1. Update your database with the order
    // 2. Send confirmation emails
    // 3. Set up the customer in your system

    return {
      success: true,
      message: "Payment processed successfully!",
      paymentIntent,
    }
  } catch (error) {
    console.error("Error handling payment success:", error)
    return {
      success: false,
      message: "Failed to process payment confirmation.",
    }
  }
}

