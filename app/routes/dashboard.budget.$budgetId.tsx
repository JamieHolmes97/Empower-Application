import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import {
  getUserBudgets
} from "~/models/budget.server";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import BudgetDetailsCard from '../components/BudgetDetailsCard'
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.budgetId, "budgetId not found");

  const budget = await getUserBudgets({
    userId,
  });
  const filteredBudget = budget.filter(item => item.id === params.budgetId);

  if (!filteredBudget) {
    throw new Response("No budget Found", { status: 404 });
  }
  return json({ filteredBudget });
};

export default function BudgetsDashboard() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return(
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
                  <BudgetDetailsCard budgetData={data.filteredBudget} viewMoreDetails={false}/>
                </Grid>
              </Grid>
            </Box>
          </div>
          <div>
            {data ? (
             null
            ) : (
              <p>No financial details available.</p>
            )}
          </div>
        </div>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Expenses
            </h2>
          </div>
        </header>
      </div>
    </>
    
  )
}
