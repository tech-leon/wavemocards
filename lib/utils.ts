import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EmoFormData } from '@/components/emoForm/formContext';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function catchError<T>(promise: Promise<T>): Promise<[T, undefined] | [Error]> {
  try {
    const data = await promise
    return [data, undefined]
  } catch (error) {
    return [error as Error]
  }
}

export function preSubmitEmoForm(emoFormData: EmoFormData, userID: string) {
  const [card1, card2, card3] = emoFormData.emotionCards;
  const bfCard1 = emoFormData.emotionIntensity[card1];
  const bfCard2 = emoFormData.emotionIntensity[card2];
  const bfCard3 = emoFormData.emotionIntensity[card3];
  const afCard1 = emoFormData.finalIntensity[card1];
  const afCard2 = emoFormData.finalIntensity[card2];
  const afCard3 = emoFormData.finalIntensity[card3];

  const emoData = {
    id: userID,
    card1,
    card2,
    card3,
    before_card1_level: bfCard1,
    before_card2_level: bfCard2,
    before_card3_level: bfCard3,
    story: emoFormData.story,
    thoughts_action: emoFormData.thoughtsAction,
    consequences: emoFormData.consequences,
    feeling_of_consequences: emoFormData.feelingOfConsequences,
    result_of_expect: emoFormData.resultOfExpect,
    take_out: emoFormData.takeOut,
    after_card1_level: afCard1,
    after_card2_level: afCard2,
    after_card3_level: afCard3,
  }
  return emoData
}
