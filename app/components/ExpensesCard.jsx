import * as React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

const ExpenseDetailsCard = ({ expenseData, allExpenses }) => {
  console.log(expenseData);

  function getCategoryName(categoryId) {
    const category = expenseData.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Category Not Found";
  }

  function getAverageForExpense(categoryName) {
    const expensesWithCategory = allExpenses.filter((expense) => getCategoryName(expense.categoryId) === categoryName);
    const totalAmount = expensesWithCategory.reduce((total, expense) => total + expense.amount, 0);
    const averageAmount = expensesWithCategory.length > 0 ? totalAmount / expensesWithCategory.length : 0;
    return averageAmount;
  }

  function getExpenseTextColor(categoryName, expenseAmount) {
    const averageAmount = getAverageForExpense(categoryName);
    return expenseAmount <= averageAmount ? "text-green-500" : "text-red-500";
  }

  const rows = expenseData.expenses.map((expense) => ({
    name: expense.description,
    amount: expense.amount,
    budgetCategory: getCategoryName(expense.categoryId),
    updatedAt: formatDate(expense.updatedAt),
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Expense Name/Description</StyledTableCell>
              <StyledTableCell align="right">Amount&nbsp;(£) </StyledTableCell>
              <StyledTableCell align="right">Budget Category</StyledTableCell>
              <StyledTableCell align="right">Community Average &nbsp;(£)</StyledTableCell>
              <StyledTableCell align="right">Updated At</StyledTableCell>
            </TableRow>
          </TableHead>

          {expenseData.expenses && expenseData.expenses.length > 0 ? (
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.budgetCategory}</StyledTableCell>
                  <StyledTableCell align="right">{getAverageForExpense(row.budgetCategory)}</StyledTableCell>
                  <StyledTableCell align="right">{row.updatedAt}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  No Expenses have yet been added, please click the plus icon above to begin adding.
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default ExpenseDetailsCard;
