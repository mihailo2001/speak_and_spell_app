import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Course from './pages/Course';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Contact from './pages/Contact';

import Profile from './pages/Profile';
import { AuthContext } from './helpers/AuthContext';
import { useState } from 'react';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: ""
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Homepage />}></Route>
            <Route path="/course/:id" element={<Course />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact/>} />
            <Route path="/post/:id" exact element={<Post/>}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer/>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
