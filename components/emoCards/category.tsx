// "use client";
// import { useTranslation } from "react-i18next";
// import EmoCard, { CardProps } from "@/components/emoCards/card";
// import React, { useState, useEffect } from "react";
// import { ArrowDownRightIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

// export default function EmoCategory({name, description, example, ID, color}: CardProps) {
//   const { t } = useTranslation(["translation", "cards", "category"]);
//   const categoryColors = useCategoryColors();
//   const [openCategories, setOpenCategories] = useState(getAllCategories());

//   const cardIds = Array.from({ length: 65 }, (_, i) => i + 1);

//   useEffect(() => {
//     // 當語言變化時，更新顯示的類別名稱
//     const updateCategories = () => {
//       setOpenCategories((prev) =>
//         prev.map((category) =>
//           t(`categories.${category.toLowerCase()}`, category)
//         )
//       );
//     };

//     updateCategories();
//   }, [i18n.language, t]);

//   if (!cards) {
//     return <p>{t("loading")}</p>;
//   }

//   const cardArray = Array.isArray(cards) ? cards : Object.values(cards);
//   if (cardArray.length === 0) {
//     return <p>No Cards</p>;
//   }

//   const categories = [...new Set(cardArray.map((card) => card.category))];

//   const toggleCategory = (category) => {
//     setOpenCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       {categories.map((category) => (
//         <div key={category} className="flex">
//           <button
//             className={`flex flex-col justify-center shadow-lg border-gray-400 shrink-0 p-2 items-center transition-all duration-1000 ease-in-out ${
//               categoryColors[category] || "bg-white"
//             } ${
//               openCategories.includes(category)
//                 ? "border-l w-10 h-52 rounded-l-full"
//                 : "w-24 h-14 rounded-xl"
//             }`}
//             onClick={() => toggleCategory(category)}
//           >
//             <h2 className="text-xl text-gray-800">{category}</h2>
//             <div className="size-4 text-gray-400">
//               {openCategories.includes(category) ? (
//                 <ArrowLeftIcon />
//               ) : (
//                 <ArrowDownRightIcon />
//               )}
//             </div>
//           </button>
//           <div
//             className={`overflow-x-scroll transition-all duration-1000 ${
//               openCategories.includes(category)
//                 ? "max-w-full max-h-52 border-r-4 "
//                 : "max-w-0 max-h-0"
//             }`}
//           >
//             <CardList
//               cards={cardArray.filter((card) => card.category === category)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
