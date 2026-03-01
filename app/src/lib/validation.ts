// Babcock email validation
const BABCOCK_DOMAINS = ["@student.babcock.edu.ng", "@babcock.edu.ng"];

export const isBabcockEmail = (email: string): boolean =>
    BABCOCK_DOMAINS.some(d => email.toLowerCase().trim().endsWith(d));

export const isValidEmailShape = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const emailFieldClass = (email: string, touched: boolean): string => {
    if (!touched || !email) return "";
    if (!isValidEmailShape(email) || !isBabcockEmail(email)) return "invalid";
    return "valid";
};
