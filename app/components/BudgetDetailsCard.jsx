import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@remix-run/react";
import { darkTheme, Item } from "../mui.utils";
import ProgressBar from "./ProgressBar";
import { Divider } from "@mui/material";

const BudgetDetailsCard = ({ budgetData, viewMoreDetails }) => {
  return (
    <>
      {budgetData.length > 0 ? (
        budgetData.map((budgetItem) => (
          <div key={budgetItem.id} className="mb-2">
            <Link className="hover:bg-blue-600 focus:bg-blue-400" to={`budget/${budgetItem.id}`}>
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
                        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
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
                              <div style={{ alignItems: "center" }}>
                                <Item>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Typography
                                        variant="subtitle1"
                                        component="div"
                                        align="left"
                                      >
                                        {category.name}
                                      </Typography>
                                      <Divider />
                                      <Typography variant="subtitle1" component="div" align="left">
                                        £{category.amountUpdated} left of £{category.amount}
                                      </Typography>
                                    </div>
                                    <div className="flex justify-end px-5">
                                      <ProgressBar
                                        progressAmount={category.amountUpdated}
                                        progressTotal={category.amount}
                                      />
                                    </div>
                                  </div>
                                </Item>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </ThemeProvider>
            </Link>
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
