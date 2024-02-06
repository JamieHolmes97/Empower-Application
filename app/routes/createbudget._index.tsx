import NavBar from "~/components/NavBar";
import { Form, redirect } from "@remix-run/react";
import { handleInputNumber } from "~/utils";
import type { ActionFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { createBudget } from "~/models/budget.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const userId = await requireUserId(request);
    const formData = await request.formData();
    const parseInteger = (value: FormDataEntryValue | null): number => {
      return value && typeof value === "string" ? parseInt(value, 10) : 0;
    };
  
    const name = formData.get("budgetName") as string;
    const totalAmount = parseInteger(formData.get("amount"));
    const duration = parseInteger(formData.get("duration"));

    const budget = await createBudget({ name , totalAmount, duration, userId})
  
    return redirect(`/createbudget/${budget.id}`);
  };

export default function CreateBudget() {
  return (
    <div className="min-h-full bg-gray-100">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">
            Welcome to creating your own Financial Budgeting Plan 
          </h2>
          <h3 className="text-1xl  mb-6">
            To begin we will need the Name and the set total amount for your budget: 
          </h3>
          <Form method="post" className="space-y-6">
          <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Budget Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  required
                  autoFocus={true}
                  name="budgetName"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Total Budget Amount
              </label>
              <div className="mt-1">
                <input
                  id="amount"
                  required
                  autoFocus={true}
                  name="amount"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  type="number"
                  onInput={handleInputNumber}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Budget Duration in Days
              </label>
              <div className="mt-1">
                <input
                  id="duration"
                  required
                  autoFocus={true}
                  name="duration"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  type="number"
                  onInput={handleInputNumber}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Next
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
