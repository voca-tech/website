import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FormDataProps } from '@/components/ContactForm';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sendEmail(data: FormDataProps) {
  const apiEndpoint = '/api/email';

  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const response = await res.json();

    return response.status;
  } catch (err) {
    return 500;
  }
}