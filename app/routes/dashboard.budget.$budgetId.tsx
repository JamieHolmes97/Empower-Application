import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import {
  getUserBudgets,
  createExpense,
  updateCategoryAmount,
  getAllExpenses,
  getAllBudgets,
  deleteBudgetById,
} from "~/models/budget.server";
import { requireUserId } from "~/session.server";
import { Form, useLoaderData } from "@remix-run/react";
import BudgetDetailsCard from "../components/BudgetDetailsCard";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from "@mui/material";
import { prisma } from "~/db.server";
import Modal from "@mui/material/Modal";
import Tooltip from '@mui/material/Tooltip';
import React from "react";
import ExpenseDetailsCard from "../components/ExpensesCard";
import VisualDataCard from "../components/VisualDataCard"
import { redirect } from "@remix-run/node";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {

    case "add": 
    const parseInteger = (value: FormDataEntryValue | null): number => {
      return value && typeof value === "string" ? parseInt(value, 10) : 0;
    };
  
    const description = formData.get("expenseName") as string;
    const amount = parseInteger(formData.get("expenseAmount"));
    const categoryId = formData.get("expenseCategory") as string;
    const budgetId = params.budgetId as string;
  
    const expense = await createExpense({
      description,
      amount,
      categoryId,
      budgetId,
    });
  
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { amount: true, amountUpdated: true },
    });
  
    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }
  
    const currentAmount = category.amountUpdated;
    const updatedAmount = currentAmount - amount;
    await updateCategoryAmount(categoryId, updatedAmount);

    return expense 

    case "delete":
    const deletedBudget = await deleteBudgetById(params.budgetId as string)
    return redirect(`/dashboard`);
  }

  };

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.budgetId, "budgetId not found");

  const allBudgets = await getAllBudgets()

  const budget = await getUserBudgets({
    userId,
  });
  const filteredBudget = budget.filter((item) => item.id === params.budgetId);

  if (!filteredBudget) {
    throw new Response("No budget Found", { status: 404 });
  }

  const allExpenses = await getAllExpenses()

  return json({ filteredBudget, allExpenses, allBudgets });
};

export default function BudgetsDashboard() {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false); 
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  

  const data = useLoaderData<typeof loader>();
  
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your Budgets Dashboard
            </h1>
            <Tooltip title="Delete Budget" placement="bottom">
            <Button onClick={handleOpenDelete}>
              <DeleteForeverIcon />
            </Button>
            </Tooltip>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <BudgetDetailsCard
                    budgetData={data.filteredBudget}
                    viewMoreDetails={false}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
          <div>{data ? null : <p>No financial details available.</p>}</div>
        </div>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 pr-2">
              Expenses
            </h2>
            <Tooltip title="Add Expense" placement="bottom">
            <Button onClick={handleOpen}>
              <AddCircleOutlineIcon />
            </Button>
            </Tooltip>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ExpenseDetailsCard expenseData={data.filteredBudget[0]} allExpenses={data.allExpenses} allBudgets={data.allBudgets} />
                </Grid>
              </Grid>
            </Box>
          </div>
          <div>{data ? null : <p>No financial details available.</p>}</div>
        </div>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 pr-2">
              Visual Data
            </h2>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <VisualDataCard filteredBudget={data.filteredBudget[0]} option={null} />
                </Grid>
              </Grid>
            </Box>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 9999 }}
          >
            <Box className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
              <h2 className="text-2xl font-semibold mb-6">
                Would you like to add an expense to your budget?
              </h2>
              <h3 className="text-1xl mb-6">
                If so fill in the detials below. The budget will automatically
                update with these details.
              </h3>
              <Form method="post" className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expense Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      required
                      autoFocus={true}
                      name="expenseName"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expense Amount
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      required
                      autoFocus={true}
                      name="expenseAmount"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="expenseCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="expenseCategory"
                      name="expenseCategory"
                      required
                      autoFocus={true}
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    >
                      <option value="">
                        Select a category from your Budget
                      </option>
                      {data.filteredBudget.length > 0 &&
                        data.filteredBudget[0].categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  name= "intent"
                  value="add"
                  className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                  onClick={() => {
                    setTimeout(() => {
                      handleClose();
                    }, 1000);
                  }}
                >
                  Add Expense
                </button>
                <button
                  className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
                  onClick={handleClose}
                >
                  Close
                </button>
              </Form>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 9999 }}
          >
            <Box className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
              <h2 className="text-2xl font-semibold mb-6">
                Are you sure you want to DELETE your Budget?
              </h2>
              <h3 className="text-1xl mb-6">
                Once you delete your budget there's no going back... you can as always create another one!
              </h3>
              <Form method="post" className="space-y-6">
                 
                <button
                  type="submit"
                  name= "intent"
                  value="delete"
                  className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                  Delete Budget
                </button>
                <button
                  className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
                  onClick={handleCloseDelete}
                >
                  Close
                </button>
              </Form>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
