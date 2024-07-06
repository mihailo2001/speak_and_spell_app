import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Course from './pages/Course';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Homepage/>}></Route>
          <Route path="/course/:id" element={<Course />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
