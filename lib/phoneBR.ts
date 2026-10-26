/** Digits only, capped at 11 (DDD + number). */
export function phoneDigits(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 11);
}

/**
 * Brazilian phone mask: (11) 98765-4321 or (11) 3456-7890
 */
export function formatPhoneBR(raw: string): string {
  const digits = phoneDigits(raw);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Valid BR landline (10) or mobile (11), with DDD 11–99. */
export function isValidPhoneBR(raw: string): boolean {
  const digits = phoneDigits(raw);
  if (digits.length !== 10 && digits.length !== 11) return false;

  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  if (digits.length === 11 && digits[2] !== "9") return false;

  return true;
}
