import { number, size, string } from "superstruct";

export const phoneValidation = size(number(), 9000000000, 9499999999);
export const objectIdValidation = size(string(), 24);