import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Loading...</h2>
        <p className="text-gray-500 mt-2">Please wait while we process your request.</p>
      </div>
    </div>
  )
}

