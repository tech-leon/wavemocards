// CategorySection.tsx
"use client";
import React, { useState } from "react";
import EmoCard from "./Card";
import { CardProps } from "./Card";
import { ArrowDownRightIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

interface CategorySectionProps {
  ID: number;
  name: string;
  color: string;
  cards: CardProps[];
}

const CategorySection = ({ name, color, cards }: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle category expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <button
        className={`flex flex-col justify-center shadow-lg border-gray-400 shrink-0 p-2 items-center transition-all duration-1000 ease-in-out ${
          isExpanded
            ? "border-l w-10 h-52 rounded-l-full"
            : "border-none w-24 h-16 rounded-xl"
        }`}
        style={{ backgroundColor: color }}
        onClick={toggleExpansion}
      >
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="size-4 text-gray-400">
          {isExpanded ? <ArrowLeftIcon /> : <ArrowDownRightIcon />}
        </div>
      </button>
      <div
        className={`flex overflow-x-auto transition-all duration-1000 ${
          isExpanded ? "max-w-full max-h-52 border-r-4" : "max-w-0"
        }`}
      >
        <div className="flex transition-all duration-1000">
          {isExpanded &&
            cards.map((card) => (
              <EmoCard
                key={card.ID}
                name={card.name}
                description={card.description}
                example={card.example}
                ID={card.ID}
                color={color} // 預設同樣的色彩
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
