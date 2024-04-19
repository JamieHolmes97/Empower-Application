import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@remix-run/react";
import { deleteBudgetById } from "../models/budget.server";
import { darkTheme, Item } from "../mui.utils";

const handleDelete = async (budgetID) => {
  console.log(budgetID);
  await deleteBudgetById(budgetID);
};

const BudgetDetailsCard = ({ budgetData, viewMoreDetails }) => {
  return (
    <>
      {budgetData.length > 0 ? (
        budgetData.map((budgetItem) => (
          <div key={budgetItem.id} className="mb-4">
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
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {budgetItem.name} Budget Details
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Budget Duration: {budgetItem.duration} Days Remaining
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        {budgetItem.categories.map((category, categoryIndex) => (
                          <Grid item xs={3} key={categoryIndex}>
                            <div className="mb-4">
                              <Item>
                                <Typography variant="subtitle1" component="div">
                                  {category.name}:
                                </Typography>
                              </Item>
                            </div>
                            <Item>
                              <div className="relative">
                                <Typography
                                  variant="subtitle2"
                                  component="div"
                                  className="absolute top-0 right-0 text-sm text-gray-500"
                                >
                                  £{category.amount}
                                </Typography>
                                <Typography variant="h2" component="div">
                                  £{category.amountUpdated}
                                </Typography>
                              </div>
                            </Item>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        {viewMoreDetails ? (
                          <Link
                            to={`budget/${budgetItem.id}`}
                            className="block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
                          >
                            View More Details
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard"
                            className="block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
                          >
                            Dashboard
                          </Link>
                        )}
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
        ))
      ) : (
        <div className="mb-4">
          <ThemeProvider theme={darkTheme}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardActions className="flex justify-center">
                  <Item>
                    <Link to="/createbudget">
                      <AddIcon fontSize="large" />
                    </Link>
                  </Item>
                </CardActions>
                <CardContent>
                  <Item>
                    <Typography variant="h6">
                      It appears you have not yet added any budgets.
                      <br />
                      Please click the icon above to add your own personalised budget.
                    </Typography>
                  </Item>
                </CardContent>
              </Card>
            </Box>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default BudgetDetailsCard;
