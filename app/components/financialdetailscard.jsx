import { useNavigate } from "@remix-run/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { darkTheme, Item } from "../mui.utils"

const FinancialDetailsCard = ({ financialData }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/updatefinancialdata");
  };

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
                Financial Details
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Item>
                      {" "}
                      <PaidIcon /> Balance:
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      {" "}
                      <AddCardIcon /> Monthly Income:
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      {" "}
                      <SavingsIcon /> Savings:
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      {" "}
                      <MoneyOffIcon /> Debt:
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      <Typography variant="h2" component="div">
                        £{financialData.balance}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      <Typography variant="h2" component="div">
                        £{financialData.income}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      <Typography variant="h2" component="div">
                        £{financialData.savings}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      <Typography variant="h2" component="div">
                        £
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button size="small">View More Details</Button>
                </Grid>
                <Grid item>
                  <Button size="small" onClick={handleRedirect}>
                    Edit Details
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default FinancialDetailsCard;
