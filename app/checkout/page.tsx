"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Check, ChevronLeft, Shield, ArrowRight } from "lucide-react"
import { Steps, Step } from "@/components/checkout-steps"
import { useToast } from "@/hooks/use-toast"
import { StripePaymentForm } from "@/components/stripe-payment-form"
import type { PaymentData } from "@/app/actions/payment"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState("5-lessons")
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    chessExperience: "intermediate",
  })

  // Form errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const plans = [
    {
      id: "single-lesson",
      name: "Single Lesson",
      price: 70,
      displayPrice: "$70",
      description: "Perfect for trying out our lessons",
      features: ["One-on-one instruction", "Personalized lesson plan", "Focus on your specific needs", "Email support"],
    },
    {
      id: "5-lessons",
      name: "5 Lesson Package",
      price: 325,
      displayPrice: "$325",
      pricePerLesson: "$65 per lesson",
      description: "Our most popular option",
      features: [
        "One-on-one instruction",
        "Personalized lesson plan",
        "Game analysis",
        "Homework assignments",
        "Priority email support",
      ],
      popular: true,
    },
    {
      id: "10-lessons",
      name: "10 Lesson Package",
      price: 600,
      displayPrice: "$600",
      pricePerLesson: "$60 per lesson",
      description: "Best value for serious students",
      features: [
        "One-on-one instruction",
        "Comprehensive improvement plan",
        "Unlimited game analysis",
        "Tournament preparation",
        "Opening repertoire development",
        "24/7 coach access",
      ],
    },
  ]

  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateStep = (currentStep: number) => {
    let isValid = true
    const newErrors = { ...errors }

    if (currentStep === 2) {
      // Validate personal details
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
        isValid = false
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
        isValid = false
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
        isValid = false
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      toast({
        title: "Please check your inputs",
        description: "There are some errors in your form.",
        variant: "destructive",
      })
    }
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  // Prepare payment data for Stripe
  const paymentData: PaymentData = {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    amount: selectedPlanDetails?.price || 0,
    planId: selectedPlanDetails?.id || "",
    planName: selectedPlanDetails?.name || "",
    metadata: {
      phone: formData.phone,
      chessExperience: formData.chessExperience,
    },
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-10">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white mb-4 hover:underline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Steps currentStep={step} className="mb-10">
          <Step title="Select Plan" />
          <Step title="Your Details" />
          <Step title="Payment" />
        </Steps>

        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.displayPrice}</span>
                      {plan.pricePerLesson && (
                        <div className="text-sm text-primary font-medium mt-1">{plan.pricePerLesson}</div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="ml-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {selectedPlan === plan.id ? (
                      <div className="w-full py-2 text-center bg-primary text-white rounded-md">Selected</div>
                    ) : (
                      <div className="w-full py-2 text-center border border-gray-200 rounded-md">Select</div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNextStep} className="flex items-center">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="john.doe@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chessExperience">Chess Experience Level</Label>
                    <RadioGroup
                      value={formData.chessExperience}
                      onValueChange={(value) => setFormData({ ...formData, chessExperience: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner">Beginner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate">Intermediate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced">Advanced</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div>
                <OrderSummary plan={selectedPlanDetails} />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button onClick={handleNextStep} className="flex items-center">
                Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-md mb-6">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Secure Payment</p>
                      <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                    </div>
                  </div>

                  {/* Stripe Payment Form */}
                  <StripePaymentForm paymentData={paymentData} />
                </div>
              </div>
              <div>
                <OrderSummary plan={selectedPlanDetails} />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function OrderSummary({ plan }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Order Summary</h3>
      <div className="space-y-4">
        <div>
          <div className="font-medium">{plan?.name}</div>
          <div className="text-gray-500">{plan?.description}</div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-medium">{plan?.displayPrice}</span>
        </div>
        {plan?.pricePerLesson && <div className="text-xs text-primary">{plan.pricePerLesson}</div>}
        <div className="text-xs text-gray-500">
          All purchases are subject to our terms and conditions. Lessons must be scheduled at least 24 hours in advance.
        </div>
      </div>
    </div>
  )
}

