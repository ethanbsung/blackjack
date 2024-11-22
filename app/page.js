
'use client';

import HitButton from "./hit-button";

import { useState } from 'react';

  function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
  }

  export default function HomePage() {
    const [balance, setBalance] = useState(1000);
    const [dealerScore, setDealerScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    function HandleClick(action) {
      console.log(`Button clicked: ${action}`);
    }

    return (
      <div>
        <Header title="Blackjack" />
        <p>Balance: ${balance}</p>
        <p>Dealer: {dealerScore}</p>
        <p>Player: {playerScore}</p>
  
        <button onClick={() => HandleClick('Hit')}>Hit</button>
        <button onClick={() => HandleClick('Stand')}>Stand</button>
        <button onClick={() => HandleClick('Double')}>Double</button>
        <button onClick={() => HandleClick('Split')}>Split</button>
        <button onClick={() => HandleClick('Deal')}>Deal</button>
      </div>
    );
  }