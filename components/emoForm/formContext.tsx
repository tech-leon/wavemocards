"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface EmoFormData {
  emotionCards: number[];
  emotionIntensity: number[];
  story: string;
  thoughtsAction: string;
  consequences: string;
  feelingOfConsequences: string;
  resultOfExpect: "yes" | "no" | "unclear";
  takeOut: string;
  finalIntensity: number[];
}

interface EmoFormContextType {
  emoFormData: EmoFormData;
  updateEmoFormData: (data: Partial<EmoFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
}

const FormContext = createContext<EmoFormContextType | undefined>(undefined);

export const EmoFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [emoFormData, setEmoFormData] = useState<EmoFormData>({
    emotionCards: [],
    emotionIntensity: [],
    story: "",
    thoughtsAction: "",
    consequences: "",
    feelingOfConsequences: "",
    resultOfExpect: "unclear",
    takeOut: "",
    finalIntensity: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem("emoFormData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setEmoFormData((prevData) => ({
            ...prevData,
            ...parsedData,
          }));
        }

        const savedStep = localStorage.getItem("currentStep");
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
      } catch (error) {
        console.error("加載 emoFormData 時發生錯誤:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("emoFormData", JSON.stringify(emoFormData));
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [emoFormData, currentStep, isLoading]);

  const updateEmoFormData = (data: Partial<EmoFormData>) => {
    setEmoFormData((prev) => {
      const updatedData = { ...prev, ...data };
      localStorage.setItem("emoFormData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <FormContext.Provider
      value={{
        emoFormData,
        updateEmoFormData,
        currentStep,
        setCurrentStep,
        isLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useEmoFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useEmoFormContext must be used within a FormProvider");
  }
  return context;
};
