import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { addFinancialDetails } from "~/models/financial.server";
import { Form } from "@remix-run/react";


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
            <h2 className="text-2xl font-semibold mb-6">
              Add your financial details
            </h2>
            <Form method="post" className="space-y-6">
              <div>
                <label
                  htmlFor="balance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Balance
                </label>
                <div className="mt-1">
                  <input
                    id="balance"
                    required
                    autoFocus={true}
                    name="balance"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="income"
                  className="block text-sm font-medium text-gray-700"
                >
                  Income
                </label>
                <div className="mt-1">
                  <input
                    id="income"
                    required
                    autoFocus={true}
                    name="income"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="savings"
                  className="block text-sm font-medium text-gray-700"
                >
                  Savings
                </label>
                <div className="mt-1">
                  <input
                    id="savings"
                    required
                    autoFocus={true}
                    name="savings"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <input type="hidden" name="redirectTo" />
              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
  );
  }