const MARKET_RATE_PER_EMPLOYEE = 40;
const VOCA_RATE_PER_EMPLOYEE = 20;

export const CONTRACT_MONTHS = 24;
export const SAVINGS_RATIO = (MARKET_RATE_PER_EMPLOYEE - VOCA_RATE_PER_EMPLOYEE) / MARKET_RATE_PER_EMPLOYEE;
export const PERCENT_SAVINGS = Math.round(SAVINGS_RATIO * 100);

export function estimateDefaultMonthlySpend(employees: number) {
    return employees * MARKET_RATE_PER_EMPLOYEE;
}

export function calculateCustomSavings(employees: number, customMonthlySpend: number | undefined, months: number) {
    const currentMonthlySpend = customMonthlySpend ?? estimateDefaultMonthlySpend(employees);
    const vocaMonthlySpend = employees * VOCA_RATE_PER_EMPLOYEE;
    const monthlySavings = Math.max(0, currentMonthlySpend - vocaMonthlySpend);
    const totalSavings = monthlySavings * months;
    const percentSavings = currentMonthlySpend > 0 ? Math.round((monthlySavings / currentMonthlySpend) * 100) : 0;

    return { currentMonthlySpend, vocaMonthlySpend, monthlySavings, totalSavings, percentSavings };
}
