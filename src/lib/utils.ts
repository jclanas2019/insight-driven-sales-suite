
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to format Chilean pesos
export const formatCLP = (amount: number): string => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};
