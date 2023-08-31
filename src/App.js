import React from 'react';
// import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Slides from './components/Slides/slides'


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="Content">
        < Slides/>
      </div>
      <Footer />
    </div>
  );
};

export default App;