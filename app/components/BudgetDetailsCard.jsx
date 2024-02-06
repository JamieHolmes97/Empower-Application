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
import { deleteBudgetById } from "../models/budget.server";

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

const handleDelete = async (budgetID) => {
  console.log(budgetID)
  await deleteBudgetById(budgetID)
}

const BudgetDetailsCard = ({ budgetData }) => {

  return (
    <>
      {budgetData.map((budgetItem) => (
        <div className="mb-4">
          <ThemeProvider theme={darkTheme}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {budgetItem.name} Budget Details
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Budget Duration: {budgetItem.duration} Days Remaining
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {budgetData ? (
                        <>
                          <>
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
                <CardActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button size="small">View More Details</Button>
                </Grid>
                <Grid item>
                  <Button size="small" onClick={() => handleDelete(budgetItem.id)}>
                    Delete Budget
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
              </Card>
            </Box>
          </ThemeProvider>
        </div>
      ))}
    </>
  );
};

export default BudgetDetailsCard;
