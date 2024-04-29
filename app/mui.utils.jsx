import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  export const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "centre",
    color: theme.palette.text.secondary,
  }));