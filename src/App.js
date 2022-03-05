import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ThemeContext from './context/context';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PasswordForgotten from './pages/PasswordForgotten';
import ChangePassword from './pages/ChangePassword';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const value = { darkTheme, setDarkTheme };
  return (
    <div className="App">
      <ThemeContext.Provider value={value}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/passwordForgotten" element={<PasswordForgotten />}></Route>
            <Route path="/changePassword/:id" element={<ChangePassword />}></Route>
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
