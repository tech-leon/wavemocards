"use client";
import React, { useState } from "react";
import { useEmoFormContext } from '@/components/emoForm/formContext';
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

export interface CardProps {
  name: string;
  description: string;
  example: string;
  ID: number;
  color: string;
  choosable: boolean;
}

const EmoCard = ({ name, description, example, ID, color, choosable }: CardProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { emoFormData, updateEmoFormData, isLoading } = useEmoFormContext();
  const isSelected = emoFormData.emotionCards.includes(ID);

  if (isLoading) {
    return <div>loading...</div>;
  }

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      // Cancel selection
      const updatedCards = emoFormData.emotionCards.filter((c) => c !== ID);
      const updatedIntensity = { ...emoFormData.emotionIntensity };
      delete updatedIntensity[ID];
      updateEmoFormData({ emotionCards: updatedCards, emotionIntensity: updatedIntensity });
    } else {
      // Select
      if (emoFormData.emotionCards.length < 3) {
        updateEmoFormData({ emotionCards: [...emoFormData.emotionCards, ID] });
      } else {
        alert(t("You can only select three cards"));
      }
    }
    console.log(emoFormData.emotionCards, ID);
  };

  return (
    <>
      <div
        key={ID}
        className={`group w-[10.8rem] px-2 cursor-pointer relative ${choosable && isSelected ? 'opacity-50' : ''}`}
        onClick={toggleCard}
        >
        {choosable && (
          <button
            onClick={handleSelection}
            className="absolute top-0 right-1 bg-white rounded-full p-1 shadow-md z-10"
          >
            {isSelected ? (
              <MinusIcon className="h-8 w-8 text-red-500 stroke-red-500 stroke-2" />
            ) : (
              <PlusIcon className="h-8 w-8 text-green-500 stroke-green-500 stroke-2" />
            )}
          </button>
        )}
        <div
          className={`shadow-md border border-gray-400 rounded-2xl p-4`}
          style={{ backgroundColor: color }}
        >
          <Image
            src={`/assets/img/card/${ID}.svg`}
            alt={name}
            className="w-32 h-auto group-hover:scale-110 duration-500"
            width={5}
            height={5}
          />
          <h3 className="text-2xl font-bold mt-2 text-center">{name}</h3>
        </div>
      </div>
      {isOpen && (
        <div
          key={ID - 1}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleCard}
        >
          <div
            className={`flex items-center w-5/6 max-w-2xl p-10 rounded-2xl`}
            style={{ backgroundColor: color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col-reverse md:flex-row w-full">
              <div className="flex flex-col md:w-7/12 px-5 text-gray-800">
                <h3 className="text-5xl font-bold mb-2">{name}</h3>
                <div className="border border-slate-300 mb-4"></div>
                <h4 className="text-2xl">{t("element.cardDescription")}</h4>
                <p className="text-lg mb-2">{description}</p>
                <h4 className="text-2xl">{t("element.cardExample")}</h4>
                <p className="text-md italic">{example}</p>
              </div>
              <div className="mb-6 md:mb-0 md:w-5/12">
                <Image
                  src={`/assets/img/card/${ID}.svg`}
                  alt={name}
                  className="w-full h-auto"
                  width={5}
                  height={5}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmoCard;