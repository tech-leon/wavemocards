import React from "react"
import { useEmoFormContext } from "@/components/emoForm/formContext"
import { EmoFormStep1 } from "./emoFormStep1"
import { EmoFormStep2 } from "./emoFormStep2"
import { EmoFormStep3 } from "./emoFormStep3"
import { EmoFormStep4 } from "./emoFormStep4"
import { EmoFormStep5 } from "./emoFormStep5"
import { Button } from "@/components/ui/button"
import { submitEmoForm } from "@/lib/api"
import { catchError } from "@/lib/utils"
import { useAuth } from "@/lib/auth/authContext"
import { useRouter } from "next/navigation"
import { initialEmoFormData } from "@/components/emoForm/formContext"
// import NotificationTrigger from "@/components/notification-trigger"
import { useToast } from "@/hooks/use-toast"
import { validateEmoFormStep } from "@/lib/validators/emoFormValidators"

const steps = [
  EmoFormStep1,
  EmoFormStep2,
  EmoFormStep3,
  EmoFormStep4,
  EmoFormStep5,
]

export const MultiStepForm: React.FC = () => {
  const { currentStep, setCurrentStep, emoFormData, updateEmoFormData } =
    useEmoFormContext()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const CurrentStepComponent = steps[currentStep]

  const handleNext = () => {
    // Validate current step
    const { isValid, message } = validateEmoFormStep(currentStep, emoFormData)
    
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: message,
      })
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const { isValid, message } = validateEmoFormStep(currentStep, emoFormData)
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: message,
      })
      return
    }
    const [response, error] = await catchError(submitEmoForm(emoFormData, user))
    if (response) {
      updateEmoFormData(initialEmoFormData)
      setCurrentStep(0)
      router.push("/find-my-emotions/you-are-the-best")
      toast({
        variant: "default",
        title: "Submit Success",
        description: "Your emotion submitted successfully.",
      })
    }
    if (error) {
      console.error("Submit form error:", error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem, try again later.",
      })
    }
  }

  return (
    <div>
      <div className="my-4 flex">
        <div className="flex justify-between w-full">
          {currentStep > 0 ? (
            <Button onClick={handlePrevious}>上一步</Button>
          ) : (
            <div className="flex flex-1"></div>
          )}
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>下一步</Button>
          ) : (
            <Button onClick={handleSubmit}>提交</Button>
          )}
        </div>
      </div>
      <CurrentStepComponent />
    </div>
  )
}
