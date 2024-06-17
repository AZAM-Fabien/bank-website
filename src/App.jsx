import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/redux.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home.jsx";
import SignIn from "./pages/signIn.jsx";
import SignUp from "./pages/signUp.jsx";
import Profile from "./pages/profile.jsx";
import ProtectedRoute from "./features/protectedRoute.jsx";
import ConnectedRoute from "./features/connectedRoute.jsx";
// import Error from "./pages/Error/Error.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ConnectedRoute />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
