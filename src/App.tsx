import React from 'react';
import './App.css';
import Tabs from './components/Tabs';
import Filter from './components/Filters';
import logo from './assets/img/logo.svg';
import Tickets from './components/Ticket';

const App = () => (
  <div className="global-container">
    <div className="logo">
      <img alt="logo" src={logo} />
    </div>
    <Filter />
    <section className="content-container">
      <Tabs />
      <Tickets />
    </section>
  </div>
);

export default App;
