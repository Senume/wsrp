import { Route, Routes } from "react-router";

import GridLayout from "./components/Recognise_page/Grid/grid";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/SignUp";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";


function App() {
  return (

      <div className="App">
        <header>
        <Navbar/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<GridLayout />}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
          </Routes>
        </main>        
      </div>


  );
}

export default App;
