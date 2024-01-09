import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import AddCardIcon from "@mui/icons-material/AddCard";

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

const OutlinedCard = ({ financialData }) => {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
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
            <Typography variant="h5" component="div">
              Income, Debts, Savings
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>
                    {" "}
                    <PaidIcon /> Monthly Income:
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    {" "}
                    <AddCardIcon /> Monthly Debt:
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    {" "}
                    <SavingsIcon /> Savings:
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant="h2" component="div">
                      {financialData.balance}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant="h2" component="div">
                      {financialData.income}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Typography variant="h2" component="div">
                      {financialData.savings}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">View More Details</Button>
          </CardActions>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default OutlinedCard;
