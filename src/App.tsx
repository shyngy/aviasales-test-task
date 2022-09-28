import React from 'react';
import './App.css';
import Tabs from './components/Tabs';
import Filter from './components/Filters';
import logo from './assets/img/logo.svg';
import Tickets from './components/Ticket';
import { useAppDispatch } from './store/hooks';
import { moreItems } from './store/slices/ticketSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const moreLoadClick = () => {
    dispatch(moreItems());
  };

  return (
    <div className="global-container">
      <div className="logo">
        <img alt="logo" src={logo} />
      </div>

      <Filter />
      <section className="content-container">
        <Tabs />
        <Tickets />
        <button onClick={moreLoadClick} type="button">еще 5 </button>
      </section>

    </div>
  );
};

export default App;
