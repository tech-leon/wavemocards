'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface EmoFormData {
  emotionCards: number[];
  emotionIntensity: number[];
  story: string;
  thoughtsAction: string;
  consequences: string;
  feelingOfConsequences: string;
  resultOfExpect: 'yes' | 'no' | 'unclear';
  takeOut: string;
  finalIntensity: number[];
}

interface EmoFormContextType {
  emoFormData: EmoFormData;
  updateEmoFormData: (data: Partial<EmoFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<EmoFormContextType | undefined>(undefined);

export const EmoFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emoFormData, setEmoFormData] = useState<EmoFormData>({
    emotionCards: [],
    emotionIntensity: [],
    story: '',
    thoughtsAction: '',
    consequences: '',
    feelingOfConsequences: '',
    resultOfExpect: 'unclear',
    takeOut: '',
    finalIntensity: [],
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('emoFormData');
    if (savedData) {
      setEmoFormData(JSON.parse(savedData));
    }
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('emoFormData', JSON.stringify(emoFormData));
    localStorage.setItem('currentStep', currentStep.toString());
  }, [emoFormData, currentStep]);

  const updateEmoFormData = (data: Partial<EmoFormData>) => {
    setEmoFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ emoFormData, updateEmoFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useEmoFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useEmoFormContext must be used within a FormProvider');
  }
  return context;
};