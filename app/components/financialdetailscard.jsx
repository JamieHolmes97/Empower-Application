import { useNavigate } from "@remix-run/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";
import AddCardIcon from "@mui/icons-material/AddCard";
import { darkTheme, Item } from "../mui.utils";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

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
              <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                Financial Details
                <Tooltip className="ml-2" title="Edit Details" placement="bottom">
                  <button onClick={handleRedirect}>
                    <EditIcon />
                  </button>
                </Tooltip>
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PaidIcon fontSize="large" />
                      <Typography variant="h6" component="span">
                        Balance: £{financialData.balance}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AddCardIcon fontSize="large" />
                      <Typography variant="h6" component="span">
                        Monthly Income: £{financialData.income}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SavingsIcon fontSize="large" />
                      <Typography variant="h6" component="span">
                        Savings: £{financialData.savings}
                      </Typography>
                    </Item>
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

export default FinancialDetailsCard;
