"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronLeft, Loader2 } from "lucide-react"
import { handlePaymentSuccess } from "@/app/actions/payment"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get("payment_intent")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentIntentId) {
        setError("Payment information not found")
        setLoading(false)
        return
      }

      try {
        const result = await handlePaymentSuccess(paymentIntentId)

        if (!result.success) {
          setError(result.message || "Failed to verify payment")
          setLoading(false)
          return
        }

        setPaymentDetails(result.paymentIntent)
        setLoading(false)
      } catch (err) {
        console.error("Error verifying payment:", err)
        setError("An unexpected error occurred while verifying your payment")
        setLoading(false)
      }
    }

    verifyPayment()
  }, [paymentIntentId])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Verifying your payment...</h2>
          <p className="text-gray-500 mt-2">Please wait while we confirm your payment details.</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link href="/checkout" className="inline-flex items-center text-primary mb-8 hover:underline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Checkout
          </Link>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Payment Verification Failed</CardTitle>
              <CardDescription>We encountered an issue while verifying your payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
              <p className="mt-4">
                If you believe this is a mistake or if your payment was processed, please contact our support team with
                your payment details.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
              <Link href="/checkout">
                <Button>Try Again</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    )
  }

  // Extract metadata from the payment
  const metadata = paymentDetails?.metadata || {}
  const planName = metadata.planName || "Chess Lessons"
  const email = metadata.email || paymentDetails?.receipt_email || "your email"
  const amount = paymentDetails?.amount ? (paymentDetails.amount / 100).toFixed(2) : "0.00"

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Thank you for your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-md mb-6">
              <h3 className="font-medium mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment ID:</span>
                  <span className="font-medium text-sm truncate max-w-[200px]">{paymentIntentId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium">What happens next?</p>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>
                    You'll receive a confirmation email at <strong>{email}</strong> with your receipt and lesson
                    details.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>
                    A chess coach will contact you within 24 hours to schedule your first lesson and assess your current
                    level.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>
                    You'll get immediate access to all course materials and resources included in your package.
                  </span>
                </li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link href="/learn">
              <Button>Explore Courses</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

