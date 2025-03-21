import React from "react"
import { cn } from "@/lib/utils"

interface StepsProps {
  currentStep: number
  className?: string
  children: React.ReactNode
}

interface StepProps {
  title: string
}

export function Steps({ currentStep, className, children }: StepsProps) {
  // Count the number of Step children
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.type as any).displayName === "Step",
  )

  const totalSteps = steps.length

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child) || (child.type as any).displayName !== "Step") {
            return null
          }

          const isActive = index + 1 === currentStep
          const isCompleted = index + 1 < currentStep
          const isLast = index === totalSteps - 1

          return (
            <div className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    isActive
                      ? "border-primary bg-primary text-white"
                      : isCompleted
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-500",
                  )}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "absolute top-10 text-center text-sm font-medium",
                    isActive || isCompleted ? "text-primary" : "text-gray-500",
                  )}
                >
                  {child.props.title}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn("h-0.5 w-full min-w-[3rem] max-w-[8rem]", isCompleted ? "bg-primary" : "bg-gray-200")}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Step({ title }: StepProps) {
  return null
}

// Add displayName for component type checking
Step.displayName = "Step"

