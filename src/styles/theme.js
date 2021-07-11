import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1f7d67",
      main: "#0e6c56",
      dark: "#0d5b45",
      contrastText: "#fff",
    },
    secondary: {
      light: "#33bb4b",
      main: "#00aa1e",
      dark: "#007615",
      contrastText: "#fff",
    },
  },
});

export default theme;
