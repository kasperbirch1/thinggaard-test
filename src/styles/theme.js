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
      light: "#545452",
      main: "#454543",
      dark: "#0e6c56",
      contrastText: "#fff",
    },
  },
});

export default theme;
