"use client";
import React, { useState, useRef, useEffect } from "react";
import EmoCard, { CardProps } from "./card";
import {
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/16/solid";

interface CategorySectionProps {
  ID: number;
  name: string;
  color: string;
  cards: CardProps[];
}

const CategorySection = ({ name, color, cards }: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Toggle category expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if scrolling is needed
  const checkForScrolling = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Check for scrolling on mount and when expanded
  useEffect(() => {
    if (isExpanded) {
      checkForScrolling();
      window.addEventListener("resize", checkForScrolling);
      return () => window.removeEventListener("resize", checkForScrolling);
    }
  }, [isExpanded]);

  return (
    <div className="flex relative">
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
        className={`flex overflow-x-auto transition-all duration-1000 ease-in-out ${
          isExpanded ? "max-w-full max-h-52 border-r-2" : "max-w-0 max-h-0"
        }`}
        ref={scrollContainerRef}
        onScroll={checkForScrolling}
      >
        <div className="flex justify-center transition-all duration-1000">
          {cards.map((card) => (
            <EmoCard
              key={card.ID}
              name={card.name}
              description={card.description}
              example={card.example}
              ID={card.ID}
              color={color}
            />
          ))}
        </div>
      </div>
      {isExpanded && showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-10 top-1/2 h-full transform -translate-y-1/2 bg-slate-400 opacity-50 hover:bg-slate-500 rounded-r-xl p-1 group"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800 group-hover:text-gray-100" />
        </button>
      )}
      {isExpanded && showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute -right-8 top-1/2 h-full transform -translate-y-1/2 bg-slate-400 opacity-50  hover:bg-slate-500 rounded-r-xl p-1 group"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800 group-hover:text-gray-100" />
        </button>
      )}
    </div>
  );
};

export default CategorySection;
