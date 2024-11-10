"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { useEmoFormContext } from "@/components/emoForm/formContext"

export const EmoFormStep3: React.FC = () => {
  const { emoFormData, updateEmoFormData } = useEmoFormContext()

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmoFormData({ story: e.target.value })
  }

//TODO: Mobile responsive.

  return (
    <div className={cn("flex flex-col my-10")}>
      <div className={cn("flex px-20")}>
        <div className={cn("flex flex-col mt-4 space-y-4 w-full")}>
          <h2 className={cn("text-2xl font-semibold mb-4")}>Step 3</h2>
          <p>
            謝謝親愛的 Leon，真誠地感受自己的情緒。
            接下來，想邀請你慢慢地潛入自己的情緒故事中，找尋自己情緒的源頭。
            若您暫時不想紀錄，可以跳過此步驟，直接點擊「下一步」。
          </p>
          <div className={cn("bg-[#77c9d8] p-6 rounded-lg shadow-sm")}>
            <p className={cn("text-gray-800 mb-4")}>
              邀請你輕輕地闔上雙眼，在呼氣與吐氣之間，慢慢地回想，在感受到「快樂、有信心、幸福」的情緒之前，發生了什麼事情呢？
            </p>
            <p className={cn("text-gray-600 mb-4")}>
              請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。
            </p>
            <textarea
              className={cn(
                "w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              )}
              placeholder="今天下午的時候..."
              value={emoFormData.story || ""}
              onChange={handleStoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
