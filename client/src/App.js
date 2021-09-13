import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Navbar from "./components/navbar";
import HomeComponent from "./screens/home";
import LoginComponent from "./screens/login";
import RegisterComponent from "./screens/register";
import ViewComponent from "./screens/viewCustomer";
import ProfileComponent from "./screens/profile";
import SplashComponent from "./components/splash";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#ef6c00",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/" exact component={SplashComponent} />
            <Route path="/home" exact component={HomeComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/register" exact component={RegisterComponent} />
            <Route path="/view/:id" exact component={ViewComponent} />
            <Route path="/profile" exact component={ProfileComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
