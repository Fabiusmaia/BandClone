import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import { AuthProvider } from "./Context/AuthContext";
import Logout from "./components/pages/Logout";
import UserDetails from "./components/pages/UserDetails";
import UserPanel from "./components/pages/UserPanel";
import AlbumDetails from "./components/pages/AlbumDetails";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/user/:id" element={<UserDetails />} />
          <Route exact path="/panel" element={<UserPanel />} />
          <Route exact path="/album/:id/:name" element={<AlbumDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
