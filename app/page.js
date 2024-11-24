
'use client';

import HitButton from "./hit-button";

import { useState } from 'react';
  // title function
  function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
  }
  // main page function that displays balance, dealer's cards, and player's cards
  export default function HomePage() {
    const [balance, setBalance] = useState(1000);
    const [dealerCards, setDealerScore] = useState([0, 0]);
    const [playerCards, setPlayerScore] = useState([0, 0]);
    function HandleClick(action) {
      console.log(`Button clicked: ${action}`);
    }

    return (
      <div>
        <Header title="Blackjack" />
        <p>Balance: ${balance}</p>
        <p>Dealer: {dealerCards[0]}, {dealerCards[1]}</p>
        <p>Player: {playerCards[0]}, {playerCards[1]}</p>
  
        <button onClick={() => HandleClick('Hit')}>Hit</button>
        <button onClick={() => HandleClick('Stand')}>Stand</button>
        <button onClick={() => HandleClick('Double')}>Double</button>
        <button onClick={() => HandleClick('Split')}>Split</button>
        <button onClick={() => HandleClick('Deal')}>Deal</button>
      </div>
    );
  }