import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";
import { darkTheme, Item } from "../mui.utils";
import { Suspense, lazy, useMemo } from "react";

const VisualDataCard = ({ filteredBudget, averageData }) => {
  const PieChart = lazy(() => import("@mui/x-charts/PieChart").then((module) => ({ default: module.PieChart })));
  const BarChart = lazy(() => import("@mui/x-charts/BarChart").then((module) => ({ default: module.BarChart })));

  const { uData, pData, xLabels } = useMemo(() => {
    if (!averageData || averageData.length === 0) {
      return { uData: [], pData: [], xLabels: [] };
    }
    return {
      uData: averageData.map((item) => item.communityAverage),
      pData: averageData.map((item) => item.budgetAverage),
      xLabels: averageData.map((item) => item.budgetCategory.trim()),
    };
  }, [averageData]);

  const { originalBudgetData, updatedBudgetData } = useMemo(() => {
    if (!filteredBudget || !filteredBudget.categories || filteredBudget.categories.length === 0) {
      return { originalBudgetData: [], updatedBudgetData: [] };
    }
    const visualizationData = filteredBudget.categories.map((category) => ({
      name: category.name,
      originalAmount: category.amount,
      updatedAmount: category.amountUpdated,
    }));
    return {
      originalBudgetData: visualizationData.map((cat) => ({
        label: cat.name,
        value: cat.originalAmount,
      })),
      updatedBudgetData: visualizationData.map((cat) => ({
        label: cat.name + '(Spent)',
        value: cat.updatedAmount,
      })),
    };
  }, [filteredBudget]);

  console.log(averageData);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Visual Data for Budget
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <PaidIcon /> Budget Summary: Total Budget&nbsp;(Inner) / Total Spend&nbsp;(Outter)
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <AddCardIcon /> Your Budget Average vs Community Average
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <div>
                      <Suspense fallback={<div>Loading Chart...</div>}>
                        <PieChart
                          series={[
                            {
                              innerRadius: 0,
                              outerRadius: 80,
                              data: originalBudgetData,
                            },
                            {
                              innerRadius: 100,
                              outerRadius: 120,
                              data: updatedBudgetData,
                            },
                          ]}
                          width={500}
                          height={300}
                          slotProps={{
                            legend: { padding: -10 }
                        }}
                        />
                      </Suspense>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <div>
                      <Suspense fallback={<div>Loading Chart...</div>}>
                        <BarChart
                          width={600}
                          height={300}
                          series={[
                            { data: pData, label: "Budget Average", id: "pvId" },
                            { data: uData, label: "Community Average", id: "uvId" },
                          ]}
                          xAxis={[{ data: xLabels, scaleType: "band" }]}
                        />
                      </Suspense>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default VisualDataCard;
