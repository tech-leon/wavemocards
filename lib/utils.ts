import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
