import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Box, Card, CardContent, Divider, Grid, Typography, Button } from "@mui/material";
import { darkTheme, Item } from "../mui.utils"


const TipsDetailsCard = ({ tipsData, userTipsData }) => {
  const [showAllTips, setShowAllTips] = useState(false);
  const [showAllUserTips, setShowAllUserTips] = useState(false);

  const initialTipsCount = 8;
  const initialUserTipsCount = 4;

  const displayedTips = showAllTips ? tipsData : tipsData.slice(0, initialTipsCount);
  const displayedUserTips = showAllTips ? userTipsData : userTipsData.slice(0, initialUserTipsCount);

  const handleToggleTips = () => {
    setShowAllTips(!showAllTips);
  };
  const handleToggleUserTips = () => {
    setShowAllTips(!showAllUserTips);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minWidth: 275 }} className="mb-4">
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Community Tips
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Tips: {tipsData.length}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {displayedTips.map((tipsData, tipIndex) => (
                  <Grid item xs={3} key={tipIndex}>
                    <div className="mb-4">
                      <Item>
                        <Typography variant="subtitle1" component="div">
                          {tipsData.university}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" component="div">
                          {tipsData.message}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" component="div">
                          {tipsData.name}
                        </Typography>
                      </Item>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {!showAllTips && (
              <Button onClick={handleToggleTips} variant="outlined" color="primary" sx={{ mt: 2 }}>
                Show More Tips
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="mb-4"
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your Tips
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Tips: {userTipsData.length}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {displayedUserTips.map((userTips, tipIndex) => (
                  <Grid item xs={3} key={tipIndex}>
                    <div className="mb-4">
                      <Item>
                        <Typography variant="subtitle1" component="div">
                          {userTips.university}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" component="div">
                          {userTips.message}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" component="div">
                          {userTips.name}
                        </Typography>
                      </Item>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {!showAllTips && (
              <Button onClick={handleToggleUserTips} variant="outlined" color="primary" sx={{ mt: 2 }}>
                Show More Tips
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default TipsDetailsCard;
