import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
     <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />}></Route> */}
        <Route exact path="/" element={user ? <Home /> : <Register />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>     
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} ></Route>
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />}></Route>
        <Route path="/profile/:username" element={!user ? <Navigate to="/" /> :<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
