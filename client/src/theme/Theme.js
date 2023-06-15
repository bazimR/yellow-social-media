import { createTheme } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    initial:{
      main:'#004242'
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.7rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: "#5658D4",
    },
    secondary: {
      main: "#ffff",
    },
    background: {
      paper: "#ffffff",
    },
    initial:{
      main:'#004242'
    }
  },
});
export default theme;