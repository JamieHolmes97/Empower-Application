import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const financialDetailsValidator = withZod(
z.object({
  balance: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0 
  }, z.number().min(0, "Balance must be a positive number or zero")),
  income: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0
  }, z.number().min(0, "Income must be a positive number or zero")),
  savings: z.preprocess((value) => {
    return value ? parseFloat(value.toString()) : 0 
  }, z.number().min(0, "Savings must be a positive number or zero")),
})
);

export const communityTipValidator = withZod(
  z.object({
    name: z.string().optional(),
    universityName: z.string()
      .min(1, { message: "University name is required." })
      .max(30, { message: "University name cannot exceed 30 characters"}),
    tipName: z.string()
      .min(10, { message: "Your tip should be at least 10 characters long." })
      .max(200, { message: "Your tip cannot exceed 300 characters." })
  })
);

