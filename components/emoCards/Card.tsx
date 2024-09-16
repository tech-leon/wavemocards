"use client";
import React, { useState } from "react";
// import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export interface CardProps {
  name: string;
  description: string;
  example: string;
  ID: number;
  color: string;
}


const EmoCard = ({ name, description, example, ID, color }: CardProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        key={ID}
        className="group group w-[10.8rem] px-2 cursor-pointer"
        onClick={toggleCard}
      >
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
          key={ID}
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
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default EmoCard;
