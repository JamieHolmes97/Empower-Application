import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { formatDate } from "~/utils";
import { useLocation } from "@remix-run/react";

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



const ExpenseDetailsCard = ({ expenseData, allExpenses, allBudgets, setRowsData }) => {

  const location = useLocation();
  const pathname = location.pathname



  function getCategoryName(categoryId, userAverage) {
    if (userAverage == true) {
      const category = expenseData.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Category Not Found";
    } else {
      for (const expenseItem of allBudgets) {
        const category = expenseItem.categories.find((cat) => cat.id === categoryId);
        if (category) {
          return category.name;
        }
      }
    }
    return "Category Not Found";
  }

  function getAverageForExpense(categoryName, userAverage) {
    const expensesWithCategory = allExpenses.filter(
      (expense) => getCategoryName(expense.categoryId, userAverage) === categoryName,
    );
    const totalAmount = expensesWithCategory.reduce((total, expense) => total + expense.amount, 0);
    const averageAmount = expensesWithCategory.length > 0 ? totalAmount / expensesWithCategory.length : 0;
    return Math.round(averageAmount);
  }

  const rows = expenseData.expenses.map((expense) => ({
    name: expense.description,
    amount: expense.amount,
    budgetCategory: getCategoryName(expense.categoryId),
    budgetAverage: getAverageForExpense( getCategoryName(expense.categoryId), true),
    communityAverage: getAverageForExpense( getCategoryName(expense.categoryId), false),
    updatedAt: formatDate(expense.updatedAt),
    expenseId: expense.id,
  }));

  useEffect(() => {
    setRowsData(rows)
  }, [expenseData, setRowsData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Expense Name/Description</StyledTableCell>
              <StyledTableCell align="right">Amount&nbsp;(£) </StyledTableCell>
              <StyledTableCell align="right">Budget Category</StyledTableCell>
              <StyledTableCell align="right">Your Budget Average &nbsp;(£)</StyledTableCell>
              <StyledTableCell align="right">Community Average &nbsp;(£)</StyledTableCell>
              <StyledTableCell align="right">Updated At</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
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
                  <StyledTableCell align="right">{row.budgetAverage}</StyledTableCell>
                  <StyledTableCell align="right">{row.communityAverage}</StyledTableCell>
                  <StyledTableCell align="right">{row.updatedAt}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/deleteexpense/${row.expenseId}?${pathname}`}>
                      <DeleteForeverIcon />
                    </Link>
                  </StyledTableCell>
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
