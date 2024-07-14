import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractTokenPair(input: string): string | null {
  const match = input.match(/<a href='[^']*' target='_blank'>([^<]+)<\/a>-<a href='[^']*' target='_blank'>([^<]+)<\/a>/);
  if (match) {
      const [_, token1, token2] = match;
      return `${token1}-${token2}`;
  }
  return null;
}

export function formatUSDVolume(volume: number): string {
  if (volume === null) {
    return '-';
  } else if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else {
    return `$${volume.toFixed(2)}`;
  }
}