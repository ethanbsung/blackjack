
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
    const [dealerCards, setDealerCards] = useState(['back_of_card', 'back_of_card']);
    const [playerCards, setPlayerCards] = useState(['back_of_card', 'back_of_card']);
    function HandleClick(action) {
      console.log(`Button clicked: ${action}`);
      if (action === 'Deal') {

        fetch("http://localhost:3000/api/deal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setDealerCards(data.dealerCards);
            setPlayerCards(data.playerCards);
          })
          .catch((error) => {
            console.error("Error fetching deal_cards data:", error);
          });
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