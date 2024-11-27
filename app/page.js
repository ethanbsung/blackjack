'use client';

import { useState } from 'react';

// Title function
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

// Main page function that displays balance, dealer's cards, and player's cards
export default function HomePage() {
  const [balance, setBalance] = useState(1000);
  const [dealerCards, setDealerCards] = useState(['back_of_card', 'back_of_card']);
  const [playerCards, setPlayerCards] = useState(['back_of_card', 'back_of_card']);
  const [dealerReveal, setDealerReveal] = useState(false); // State to control revealing the second dealer card

  function HandleClick(action) {
    console.log(`Button clicked: ${action}`);
    if (action === 'Deal') {
      fetch('http://127.0.0.1:5000/api/deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);

          const dealerCardImages = data.dealer_cards.map(
            (card) => `/cards/${card.rank}_of_${card.suit}.png`
          );
          console.log('Dealer Card Images:', dealerCardImages);

          const playerCardImages = data.player_cards.map(
            (card) => `/cards/${card.rank}_of_${card.suit}.png`
          );
          console.log('Player Card Images:', playerCardImages);

          setDealerCards(dealerCardImages);
          setPlayerCards(playerCardImages);

          console.log('Updated Dealer Cards:', dealerCardImages);
          console.log('Updated Player Cards:', playerCardImages);
        })
        .catch((error) => {
          console.error('Error fetching deal_cards data:', error);
        });
    } else if (action === 'Stand') {
      console.log('Player stands. Revealing dealer’s second card.');
      setDealerReveal(true); // Reveal the second dealer card
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
              src={index === 0 || dealerReveal ? card : '/cards/back_of_card.png'} // Reveal the first card, and reveal the second card when dealerReveal is true
              alt={`Dealer Card ${index + 1}`}
              style={{ width: '100px', margin: '5px' }}
            />
          ))}
        </div>
      </div>

      {/* Player Section */}
      <div>
        <h2>Player</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {playerCards.map((card, index) => (
            <img
              key={index}
              src={card || '/cards/back_of_card.png'} // Fallback to "back_of_card.png"
              alt={`Player Card ${index + 1}`}
              style={{ width: '100px', margin: '5px' }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <button onClick={() => HandleClick('Hit')}>Hit</button>
      <button onClick={() => HandleClick('Stand')}>Stand</button>
      <button onClick={() => HandleClick('Double')}>Double</button>
      <button onClick={() => HandleClick('Split')}>Split</button>
      <button onClick={() => HandleClick('Deal')}>Deal</button>
    </div>
  );
}