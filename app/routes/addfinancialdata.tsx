import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { addFinancialDetails } from "~/models/financial.server";
import { financialDetailsValidator } from "~/validation/validation";
import FormInput from "~/components/FormInput";
import { ValidatedForm } from "remix-validated-form";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const parseInteger = (value: FormDataEntryValue | null): number => {
    return value && typeof value === "string" ? parseInt(value, 10) : 0;
  };

  const balance = parseInteger(formData.get("balance"));
  const income = parseInteger(formData.get("income"));
  const savings = parseInteger(formData.get("savings"));

  await addFinancialDetails({ balance, savings, income, userId });

  return redirect(`/dashboard`);
};

export default function AddFinancialData() {
  return (
    <div className="min-h-full bg-gray-100">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Add your Financial Details</h2>
          <ValidatedForm validator={financialDetailsValidator} method="post" className="space-y-6">
            <FormInput name="balance" label="Overall Balance" type="number" autoFocus />
            <FormInput name="income" label="Monthly Income" type="number" />
            <FormInput name="savings" label="Current Savings" type="number" />
            <button type="submit" className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400">
              Submit
            </button>
          </ValidatedForm>
        </div>
      </div>
    </div>
  );
}
