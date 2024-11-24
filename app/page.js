
'use client';

import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import HitButton from "./hit-button";

import { useState } from 'react';
  // title function
  function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
  }
  // main page function that displays balance, dealer's cards, and player's cards
  export default function HomePage() {
    const [balance, setBalance] = useState(1000);
    const [dealerCards, setDealerScore] = useState(['back_of_card', 'back_of_card']);
    const [playerCards, setPlayerScore] = useState(['back_of_card', 'back_of_card']);
    function HandleClick(action) {
      console.log(`Button clicked: ${action}`);

      if (action === 'Deal') {
        const randomCards = ['ace_of_spades', 'king_of_hearts', '2_of_diamonds', '10_of_clubs'];
        setDealerCards([randomCards[0], randomCards[1]]);
        setPlayerCards([randomCards[2], randomCards[3]]);
      }
    }

    return (
      <div>
        <Header title="Blackjack" />
        <p>Balance: ${balance}</p>

        {/* Dealer Section */}
        <div>
          <h2>Dealer</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {dealerCards.map((card, index) => (
              <img
                key={index}
                src={`/cards/${card}.png`} // Dynamically load card image
                alt={`Dealer Card ${index + 1}`}
                style={{ width: '100px', margin: '5px' }}
              />
            ))}
          </div>
        </div>
        
        {/* Player Section*/}
        <div>
          <h2>Player</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {playerCards.map((card, index) => (
              <img
                key={index}
                src={`/cards/${card}.png`} // Dynamically load card image
                alt={`Player Card ${index + 1}`}
                style={{ width: '100px', margin: '5px' }}
              />
            ))}
          </div>
        </div>
        
  
        <button onClick={() => HandleClick('Hit')}>Hit</button>
        <button onClick={() => HandleClick('Stand')}>Stand</button>
        <button onClick={() => HandleClick('Double')}>Double</button>
        <button onClick={() => HandleClick('Split')}>Split</button>
        <button onClick={() => HandleClick('Deal')}>Deal</button>
      </div>
    );
  }