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
import { useAuth } from "@/lib/auth/authContext";
import { useRouter } from "next/navigation";
import { initialEmoFormData } from "@/components/emoForm/formContext";
const steps = [
  EmoFormStep1,
  EmoFormStep2,
  EmoFormStep3,
  EmoFormStep4,
  EmoFormStep5,
]

export const MultiStepForm: React.FC = () => {
  const { currentStep, setCurrentStep, emoFormData, updateEmoFormData } = useEmoFormContext()
  const { user } = useAuth()
  const router = useRouter()
  const CurrentStepComponent = steps[currentStep]

  const handleNext = () => {
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
    const [response, error] = await catchError(
      submitEmoForm(emoFormData, user)
    )
    if (response) {
      // 導航到感謝頁面
      router.push('/find-my-emotions/you-are-the-best');
      // localStorage.removeItem("emoFormData")
      // localStorage.removeItem("currentStep")
      updateEmoFormData(initialEmoFormData)
      setCurrentStep(0)
    }
    if (error) {
      console.error("提交表單時發生錯誤:", error)
      // 處理錯誤，例如顯示錯誤消息給用戶
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
