import "./App.css";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Menu from "./Components/Layout/Menu/Menu";
import AlertPopup from "./Components/Layout/Notification/AlertPopup";
import Main from "./Components/Main/Home/Main";
import Login from "./Components/Main/LoginView/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Main />
      <Footer />
      <AlertPopup />
    </div>
  );
}

export default App;
