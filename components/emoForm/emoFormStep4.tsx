"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useEmoFormContext } from "@/components/emoForm/formContext";

export const EmoFormStep4: React.FC = () => {
  const { emoFormData, updateEmoFormData } = useEmoFormContext();

  const handleThoughtsActionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmoFormData({ thoughtsAction: e.target.value });
  };
  const handleConsequencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmoFormData({ consequences: e.target.value });
  };
  const handleFeelingOfConsequencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmoFormData({ feelingOfConsequences: e.target.value });
  };
  const handleTakeOutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmoFormData({ takeOut: e.target.value });
  };

  return (
    <div className={cn("flex flex-col my-10")}>
      <div className={cn("flex px-20")}>
        <div className={cn("flex flex-col mt-4 space-y-4 w-full")}>
          <h2 className="text-2xl font-semibold mb-4">Step 4</h2>
          <div className="bg-[#77c9d8] p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              邀請你輕輕地闔上雙眼，在呼氣與吐氣之間，慢慢地回想，在感受到「快樂、有信心、幸福」的情緒之前，發生了什麼事情呢？
            </p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。"
              value={emoFormData.thoughtsAction || ''}
              onChange={handleThoughtsActionChange}
            />
          </div>
          <div className="bg-[#77c9d8] p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              邀請你輕輕地闔上雙眼，在呼氣與吐氣之間，慢慢地回想，在感受到「快樂、有信心、幸福」的情緒之前，發生了什麼事情呢？
            </p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。"
              value={emoFormData.consequences || ''}
              onChange={handleConsequencesChange}
            />
          </div>
          <div className="bg-[#77c9d8] p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              邀請你輕輕地闔上雙眼，在呼氣與吐氣之間，慢慢地回想，在感受到「快樂、有信心、幸福」的情緒之前，發生了什麼事情呢？
            </p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。"
              value={emoFormData.feelingOfConsequences || ''}
              onChange={handleFeelingOfConsequencesChange}
            />
          </div>
          <div className="bg-[#77c9d8] p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              邀請你輕輕地闔上雙眼，在呼氣與吐氣之間，慢慢地回想，在感受到「快樂、有信心、幸福」的情緒之前，發生了什麼事情呢？
            </p>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。"
              value={emoFormData.takeOut || ''}
              onChange={handleTakeOutChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
