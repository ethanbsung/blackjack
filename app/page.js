
'use client';

import HitButton from "./hit-button";

import { useState } from 'react';

  function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
  }

  export default function HomePage() {
    const [balance, setBalance] = useState(1000);
    
    function HandleClick(action) {
      console.log(`Button clicked: ${action}`);
    }

    return (
      <div>
        <Header title="Blackjack" />
        <p>Balance: ${balance}</p>
        <button onClick={() => HandleClick('Hit')}>Hit</button>
        <button onClick={() => HandleClick('Stand')}>Stand</button>
        <button onClick={() => HandleClick('Double')}>Double</button>
        <button onClick={() => HandleClick('Split')}>Split</button>
      </div>
    );
  }