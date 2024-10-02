import React from 'react';
import { useEmoFormContext } from '@/components/emoForm/formContext';
import { EmoFormStep1 } from './emoFormStep1';
import { EmoFormStep2 } from './emoFormStep2';
// 導入其他步驟組件
import { Button } from '@/components/ui/button';

const steps = [
  EmoFormStep1,
  EmoFormStep2
  // Step2EmotionIntensity,
  // 添加其他步驟組件
];

export const MultiStepForm: React.FC = () => {
  const { currentStep, setCurrentStep, emoFormData } = useEmoFormContext();

  const CurrentStepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emoFormData),
      });
      if (response.ok) {
        // 清除 localStorage
        localStorage.removeItem('formData');
        localStorage.removeItem('currentStep');
        // 導航到感謝頁面
        // 使用 Next.js 的路由導航
        // router.push('/thank-you');
      } else {
        throw new Error('提交失敗');
      }
    } catch (error) {
      console.error('提交表單時發生錯誤:', error);
      // 處理錯誤，例如顯示錯誤消息給用戶
    }
  };

  return (
    <div>
      <CurrentStepComponent />
      <div className="mt-4 flex justify-between">
        {currentStep > 0 && (
          <Button onClick={handlePrevious}>上一步</Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>下一步</Button>
        ) : (
          <Button onClick={handleSubmit}>提交</Button>
        )}
      </div>
    </div>
  );
};