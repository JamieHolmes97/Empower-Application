import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import NavBar from "../components/NavBar";
import { useLoaderData } from "@remix-run/react";
import { editFinancialDetails } from "~/models/financial.server";
import { requireUserId } from "~/session.server";
import { ActionFunction } from "@remix-run/node";
import { getFinancialDetails } from "~/models/financial.server";
import { handleInputNumber } from "~/utils";
import { createBudget, createCategory, createExpense } from "~/models/budget.server";


export const loader: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const financialDetails = await getFinancialDetails({ userId });
  return financialDetails;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const parseInteger = (value: FormDataEntryValue | null): number => {
    return value && typeof value === "string" ? parseInt(value, 10) : 0;
  };

  const balance = parseInteger(formData.get("balance"));
  const income = parseInteger(formData.get("income"));
  const savings = parseInteger(formData.get("savings"));

  // const name = 'Testing Category'
  // const totalAmount = 250
  // const duration = 20
  // const budgetId = 'clrkq9a9q0002r4g5ksxsn8o8'
  // const amount = 50

  await editFinancialDetails({ balance, savings, income, userId });
  //await createBudget({name, totalAmount, duration, userId})
  //await createCategory ({ name, amount, budgetId, })

  return redirect(`/dashboard`);
};

export default function EditFinancialData() {
  interface FinancialDetails {
    balance: number;
    income: number;
    savings: number;
  }

  const data = useLoaderData<FinancialDetails>();

  return (
    <div className="min-h-full bg-gray-100">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">
            Update your financial details
          </h2>
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-gray-700"
              >
                Overall Balance
              </label>
              <div className="mt-1">
                <input
                  id="balance"
                  required
                  defaultValue={data.balance}
                  autoFocus={true}
                  name="balance"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  type="number"
                  onInput={handleInputNumber}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="income"
                className="block text-sm font-medium text-gray-700"
              >
                Monthly Income
              </label>
              <div className="mt-1">
                <input
                  id="income"
                  required
                  defaultValue={data.income}
                  autoFocus={true}
                  name="income"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  type="number"
                  onInput={handleInputNumber}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="savings"
                className="block text-sm font-medium text-gray-700"
              >
                Current Savings
              </label>
              <div className="mt-1">
                <input
                  id="savings"
                  required
                  defaultValue={data.savings}
                  autoFocus={true}
                  name="savings"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  type="number"
                  onInput={handleInputNumber}
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
