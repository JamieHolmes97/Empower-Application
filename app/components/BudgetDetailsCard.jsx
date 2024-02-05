import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@remix-run/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BudgetDetailsCard = ({ budgetData }) => {
  return (
    <>
      {budgetData.map((budgetItem) => (
        <div className="mb-4">
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Personal Budget Details
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {budgetData ? (
                      <>
                        <>
                          <Grid item xs={3}>
                            <Item>
                              <h1>Budget Name: {budgetItem.name}</h1>
                            </Item>
                          </Grid>
                          <Grid item xs={9}></Grid>
                          {budgetItem.categories.map(
                            (category, categoryIndex) => (
                              <Grid item xs={3} key={categoryIndex}>
                                <div className="mb-4">
                                  <Item>
                                    <Typography
                                      variant="subtitle1"
                                      component="div"
                                    >
                                      {category.name}:
                                    </Typography>
                                  </Item>
                                </div>
                                <Item>
                                  <Typography variant="h2" component="div">
                                    £{category.amount}
                                  </Typography>
                                </Item>
                              </Grid>
                            ),
                          )}
                        </>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <Item>
                            <h1>
                              It appears you have not yet added any budget.
                              <br />
                              Please click the icon below to add your own
                              personalised budget.
                            </h1>
                          </Item>
                        </div>
                        <div>
                          <Item>
                            <Link to="/createbudget">
                              <AddIcon />
                            </Link>
                          </Item>
                        </div>
                      </>
                    )}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </ThemeProvider>
        </div>
      ))}
    </>
  );
};

export default BudgetDetailsCard;
