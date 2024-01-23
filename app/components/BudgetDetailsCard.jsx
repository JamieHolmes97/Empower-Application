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
  const [budgetExists, createBudget] = useState(false);
    //console.log({budgetData})
  return (
    <>
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
                  <Grid item xs={12}>
                    {budgetExists ? (
                      <Item>
                        <h1>you have a budget</h1>
                      </Item>
                    ) : (
                      <>
                        <div className="mb-4">
                          <Item>
                            <h1>
                              It appears you have not yeat added any budget.
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
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default BudgetDetailsCard;
