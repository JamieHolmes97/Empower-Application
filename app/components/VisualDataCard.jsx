import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";
import { darkTheme, Item } from "../mui.utils";
import { Suspense, lazy } from "react";

const VisualDataCard = ({ filteredBudget, option }) => {
    
  const PieChart = lazy(() => import("@mui/x-charts/PieChart").then((module) => ({ default: module.PieChart })));

  return (
    <>
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
                      {" "}
                      <PaidIcon /> Original Budget:
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      {" "}
                      <AddCardIcon /> Remaining Budget:
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <div>
                        <Suspense fallback={<div>Loading Chart...</div>}>
                          <PieChart
                            series={[
                              {
                                startAngle: -90,
                                endAngle: 90,
                                data: [
                                  { id: 0, value: 10, label: "series A" },
                                  { id: 1, value: 15, label: "series B" },
                                  { id: 2, value: 20, label: "series C" },
                                ],
                              },
                            ]}
                            width={400}
                            height={200}
                          />
                        </Suspense>
                        <h1>Jamie Is testing Pie charts</h1>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                    <div>
                        <Suspense fallback={<div>Loading Chart...</div>}>
                          <PieChart
                            series={[
                              {
                                startAngle: -90,
                                endAngle: 90,
                                data: [
                                  { id: 0, value: 10, label: "series A" },
                                  { id: 1, value: 15, label: "series B" },
                                  { id: 2, value: 20, label: "series C" },
                                ],
                              },
                            ]}
                            width={400}
                            height={200}
                          />
                        </Suspense>
                        <h1>Jamie Is testing Pie charts</h1>
                      </div>
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

export default VisualDataCard;
