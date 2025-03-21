"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { createPaymentIntent, type PaymentData } from "@/app/actions/payment"

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export function StripePaymentForm({
  paymentData,
}: {
  paymentData: PaymentData
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const initializePayment = async () => {
      try {
        setLoading(true)
        const result = await createPaymentIntent(paymentData)

        if (!result.success || !result.clientSecret) {
          setError(result.message || "Failed to initialize payment")
          return
        }

        setClientSecret(result.clientSecret)
      } catch (err) {
        setError("An unexpected error occurred")
        console.error("Payment initialization error:", err)
      } finally {
        setLoading(false)
      }
    }

    initializePayment()
  }, [paymentData])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Initializing payment...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  if (!clientSecret) {
    return null
  }

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000000",
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="w-full">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    // Check for payment intent status from URL
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred")
    } else {
      setMessage("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.value.email)} />
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      {message && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          {message}
        </div>
      )}

      <Button disabled={isLoading || !stripe || !elements} className="w-full" type="submit">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay now"
        )}
      </Button>
    </form>
  )
}

