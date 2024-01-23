import { getFinancialDetails } from "~/models/financial.server";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FinancialDetailsCard from "../components/FinancialDetailsCard";
import NavBar from "../components/NavBar";
import BudgetDetailsCard from '../components/BudgetDetailsCard'
import { getUserBudgets } from "~/models/budget.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);
  const financialDetails = await getFinancialDetails({ userId });
  const usersBudgets = await getUserBudgets({userId})

  return financialDetails;
}

export default function Dashboard() {
  const data = useLoaderData();
  console.log({data})
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your Dashboard
            </h1>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FinancialDetailsCard financialData={data} />
                </Grid>

                <Grid item xs={6}>
                  <BudgetDetailsCard/>
                </Grid>
                <Grid item xs={6}>
                </Grid>

              </Grid>
            </Box>
          </div>
          {/* Display financial details */}
          <div>
            <h2>Financial Details</h2>
            {data ? (
              <>
                <p>ID: {data.id}</p>
                <p>Balance: {data.balance}</p>
                <p>Income: {data.income}</p>
                <p>Savings: {data.savings}</p>
              </>
            ) : (
              <p>No financial details available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
