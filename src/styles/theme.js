import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
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
  overrides: {
    MuiPickersToolbar: {
      toolbar: {},
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#111",
        background: "#eee",
        border: "2px solid white",
        "&:hover": {
          color: "#333",
          background: "#0e6c5680",
        },
      },
      daySelected: {
        backgroundColor: "#0e6c56",
        border: "none",
        "&:hover": {
          color: "#fff",
        },
      },
      dayDisabled: {
        border: "none",
        color: "#aaa",
        background: "transparent",
      },
      current: {
        color: "#0f0",
      },
    },
    MuiPickersModal: {
      dialogAction: {},
    },
  },
});

export default theme;
