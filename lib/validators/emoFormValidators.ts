"use client"
import { EmoFormData } from "@/components/emoForm/formContext"

// Define validation rules for each step
export const validateEmoFormStep = (step: number, formData: EmoFormData) => {
  switch (step) {
    case 0:
      return validateStep1(formData)
    case 1:
      return validateStep2(formData)
    // case 2:
    //   return validateStep3(formData)
    // case 3:
    //   return validateStep4(formData)
    case 4:
      return validateStep5(formData)
    default:
      return { isValid: true, message: "" }
  }
}

const validateStep1 = (formData: EmoFormData) => {
  if (formData.emotionCards.length !== 3) {
    return {
      isValid: false,
      message: "Please select three emotions. You selected " + formData.emotionCards.length + " emotions.",
    }
  }
  return { isValid: true, message: "" }
}

const validateStep2 = (formData: EmoFormData) => {
  if (Object.keys(formData.emotionIntensity).length !== 3) {
    return {
      isValid: false,
      message: "Please choose your emotion intensity. You gave " + Object.keys(formData.emotionIntensity).length + " intensity.",
    }
  }
  return { isValid: true, message: "" }
}

const validateStep5 = (formData: EmoFormData) => {
  if (Object.keys(formData.finalIntensity).length !== 3) {
    return {
      isValid: false,
      message: "Please choose your emotion intensity. You gave " + Object.keys(formData.finalIntensity).length + " intensity.",
    }
  }
  return { isValid: true, message: "" }
}
