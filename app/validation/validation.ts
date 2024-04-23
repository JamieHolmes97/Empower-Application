import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const financialDetailsValidator = withZod(
z.object({
  balance: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0  // Ensure value is treated as a float
  }, z.number().min(0, "Balance must be a positive number or zero")),
  income: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0  // Ensure value is treated as a float
  }, z.number().min(0, "Income must be a positive number or zero")),
  savings: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0  // Ensure value is treated as a float
  }, z.number().min(0, "Savings must be a positive number or zero")),
})
);

