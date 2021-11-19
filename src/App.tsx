import React from 'react';
import Header from './components/header/Header';
import MusicEvents from './components/MainContainer/MusicEvents/MusicEvents';
import Footer from './components/footer/Footer';
import './App.scss';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

function App() {
  return (
    <div className="App">
      <Header/>
      <MusicEvents/>
      <Footer/>
    </div>
  );
}

export default App;
