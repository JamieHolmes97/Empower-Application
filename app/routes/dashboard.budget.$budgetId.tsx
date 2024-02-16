import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import {
  getUserBudgets,
  createExpense,
  updateCategoryAmount,
} from "~/models/budget.server";
import { requireUserId } from "~/session.server";
import { Form, useLoaderData } from "@remix-run/react";
import BudgetDetailsCard from "../components/BudgetDetailsCard";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { useState } from "react";
import { prisma } from "~/db.server";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
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

  // Get current category amount
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { amount: true },
  });

  if (!category) {
    throw new Error(`Category with id ${categoryId} not found`);
  }

  const currentAmount = category.amount;
  const updatedAmount = currentAmount - amount;
  await updateCategoryAmount(categoryId, updatedAmount);

  return expense;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.budgetId, "budgetId not found");

  const budget = await getUserBudgets({
    userId,
  });
  const filteredBudget = budget.filter((item) => item.id === params.budgetId);

  if (!filteredBudget) {
    throw new Response("No budget Found", { status: 404 });
  }
  return json({ filteredBudget });
};

export default function BudgetsDashboard() {
  const [addExpense, setAddExpense] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your Budgets Dashboard
            </h1>
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
            <Button onClick={handleOpen}>
              <AddCircleOutlineIcon />
            </Button>
          </div>
        </header>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                  <option value="">Select a category from your Budget</option>
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
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              onClick={() => {
                setTimeout(() => {
                  handleClose();
                }, 1000);
              }}
            >
              Add Expense
            </button>
          </Form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
