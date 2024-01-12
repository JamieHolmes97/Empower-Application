import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";
import { useLoaderData } from "@remix-run/react";
import { editFinancialDetails } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { ActionFunction } from "@remix-run/node";
import { getFinancialDetails } from "~/models/note.server";

export const loader: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const financialDetails = await getFinancialDetails({ userId });
  return financialDetails;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const parseInteger = (value: FormDataEntryValue | null): number => {
    return value && typeof value === "string" ? parseInt(value, 10) : 0;
  };

  const balance = parseInteger(formData.get("balance"));
  const income = parseInteger(formData.get("income"));
  const savings = parseInteger(formData.get("savings"));

  await editFinancialDetails({ balance, savings, income, userId });

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
                  Balance
                </label>
                <div className="mt-1">
                  <input
                    id="balance"
                    required
                    defaultValue={data.balance}
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
                    defaultValue={data.income}
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
                    defaultValue={data.savings}
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

  // <div className="min-h-full">
  //   <NavBar />
  // <div className="min-h-screen flex flex-col justify-center items-center">
  //   <ThemeProvider theme={darkTheme}>
  //     <Box sx={{ minWidth: 200 }}>
  //       <Card variant="outlined">
  //         <CardContent>
  //           <Typography
  //             sx={{ fontSize: 40, marginBottom: 4 }}
  //             color="text.secondary"
  //             gutterBottom
  //           >
  //             Edit Financial Details
  //           </Typography>

  //           <Form
  //             method="post"
  //             style={{
  //               display: "flex",
  //               flexDirection: "column",
  //               gap: 16,
  //             }}
  //           >
  //             <TextField
  //               id="outlined-basic"
  //               defaultValue={data.balance}
  //               label="Balance"
  //               variant="outlined"
  //               name="balance"
  //               fullWidth
  //               margin="normal"
  //               helperText={"Please enter a valid number"}
  //             />

  //             <TextField
  //               id="outlined-basic"
  //               defaultValue={data.income}
  //               label="Monthly Income"
  //               variant="outlined"
  //               name="income"
  //               fullWidth
  //               margin="normal"
  //             />

  //             <TextField
  //               id="outlined-basic"
  //               defaultValue={data.savings}
  //               label="Savings"
  //               variant="outlined"
  //               name="savings"
  //               fullWidth
  //               margin="normal"
  //             />

  //             <div className="text-center mt-8">
  //               <button
  //                 type="submit"
  //                 className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
  //               >
  //                 Save
  //               </button>
  //             </div>
  //           </Form>
  //         </CardContent>
  //       </Card>
  //     </Box>
  //   </ThemeProvider>
  // </div>
  // </div>
  // );
}
