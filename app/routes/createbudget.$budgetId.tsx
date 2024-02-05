import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import NavBar from "~/components/NavBar";
import { Form, useLoaderData } from "@remix-run/react";
import { getUniqueBudgetIDAndUserID, createCategory } from "~/models/budget.server";
import { handleInputNumber } from "~/utils";


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const userId = await requireUserId(request);
    invariant(params.budgetId, "budgetId not found");
  
    const budget = await getUniqueBudgetIDAndUserID({ id: params.budgetId, userId});
    if (!budget) {
      throw new Response("No budget Found", { status: 404 });
    }
    return json({ budget });
  };

  export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const parseInteger = (value: FormDataEntryValue | null): number => {
      return value && typeof value === "string" ? parseInt(value, 10) : 0;
    };
  
    const name = formData.get("categoryName") as string;
    const amount = parseInteger(formData.get("amount"));
    const budgetId = params.budgetId as string

    const category = await createCategory({name, amount, budgetId })
  
    // return redirect(`/dashboard`);
    return category
  };

export default function CreateBudgetCategory () {

    const data = useLoaderData<typeof loader>();

    return (
        <div className="min-h-full bg-gray-100">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-6">
            {data.budget.name}
          </h1>
        <h2 className="text-2xl font-semibold mb-6">
            Next we will add some individual Categories
          </h2>
          <h3 className="text-1xl  mb-6">
            To begin we will Name the Category and the set total amount for it: 
          </h3>
          <h2 className="text-2xl font-semibold mb-6">
            Total Budget Amount = £{data.budget.totalAmount}
          </h2>
          <h2 className="text-2xl font-semibold mb-6">
            Total Budget Remaining = £{data.budget.totalAmount}
          </h2>
          <Form method="post" className="space-y-6">
          <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  required
                  autoFocus={true}
                  name="categoryName"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Category Amount
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
             <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Add Category 
            </button>
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Finish 
            </button>
           
          </Form>
        </div>
      </div>
    </div>

    )
}