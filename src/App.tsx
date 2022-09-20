import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Menu from "./Components/Layout/Menu/Menu";
import AlertPopup from "./Components/Layout/Notification/AlertPopup";
import Main from "./Components/Main/Home/Main";
import Login from "./Components/Main/LoginView/Login";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#A673E7",
    },
    secondary: {
      main: "#286aa6",
    },
    warning: {
      main: "#ffc400",
    },
    background: {
      default: "#572c74",
      paper: "#1C0935",
    },
    divider: "#bdbdbd",
  },
  typography: {
    fontFamily: "Signika",
    button: {
      fontFamily: "Signika",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <Menu />
        <Main />
        <Footer />
        <AlertPopup />
      </div>
    </ThemeProvider>
  );
}

export default App;
