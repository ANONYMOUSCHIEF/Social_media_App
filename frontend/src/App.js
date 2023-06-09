import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Components/AuthContext";
import Chat from "./Pages/Chat";
function App() {
  const {user}=useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ?<Home/>:<SignUp/>} />
          <Route path="/chat" element={user ?<Chat/>:<SignUp/>} />
          <Route path="/profile/:userid" element={user ? <Profile />:<SignUp/>} />
          <Route path="/signup" element={user ?<Home/>:<SignUp />} />
          <Route path="/login" element={user ?<Home/>:<SignUp login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
