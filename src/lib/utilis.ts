'use client'
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: Error, message: string) {
  if (error instanceof Error) {
    console.error('Error:', message, error.message, error.stack);
  } else {
    console.error('Unknown error:', message, error);
  }
}
