import { Route, Routes } from "react-router";
import "./App.css";
import GridLayout from "./components/Grid/grid";
import LoginPage from "./components/Login/Login";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "./components/Login/SignUp";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {/* <Route path="/audio" element={<GridLayout />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
