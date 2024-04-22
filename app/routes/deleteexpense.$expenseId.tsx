import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteExpenseById } from "~/models/budget.server";
import { Form } from "@remix-run/react";
import NavBar from "~/components/NavBar";
  
export const action = async ({ params }: ActionFunctionArgs) => {

   
  const deletedExpense = await deleteExpenseById(params.expenseId as string);

  return redirect('/dashboard');
};

export default function DeleteExpense() {
  

  return (
    <div className="min-h-full bg-gray-100">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Are you sure you want to delete this expense?</h2>
          <Form method="post" className="space-y-6">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Delete Expense
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
