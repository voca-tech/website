export type RoiLeadPayload = {
  leadName: string;
  email: string;
  phone: string;
  employees: number;
  features: string[];
  platformCount: number;
  /** User-entered monthly spend; null if they skipped / used market estimate */
  monthlySpendInformed: number | null;
  currentMonthlySpend: number;
  vocaMonthlySpend: number;
  monthlySavings: number;
  totalSavings: number;
  percentSavings: number;
  contractMonths: number;
  noSavings: boolean;
};

export async function sendRoiLeadEmail(data: RoiLeadPayload) {
  try {
    const res = await fetch("/api/email/roi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response.status as number;
  } catch {
    return 500;
  }
}
