import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteExpenseById, updateCategoryAmount, findExpenseById } from "~/models/budget.server";
import { Form } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import { prisma } from "~/db.server";
import { updateBalance } from "~/models/financial.server";
import { requireUserId } from "~/session.server";
  
export const action = async ({ request, params }: ActionFunctionArgs) => {

  const userId = await requireUserId(request);
  const expenseDetails = await findExpenseById(params.expenseId as string)
  const expenseAmount = expenseDetails.amount

  const category = await prisma.category.findUnique({
    where: { id: expenseDetails.categoryId },
    select: { amount: true, amountUpdated: true },
  });

  if (!category) {
    throw new Error(`Category with id ${expenseDetails.categoryId} not found`);
  }

  const updatedAmount = category.amountUpdated + expenseAmount
  const amount = -expenseAmount

  const updatedExpense = await updateCategoryAmount(expenseDetails.categoryId, updatedAmount)
  const deletedExpense = await deleteExpenseById(params.expenseId as string);
  await updateBalance({userId, amount})
  
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
