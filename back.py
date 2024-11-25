from flask import Flask, jsonify, request
from flask_cors import CORS
from enum import Enum
import random

app = Flask(__name__)
CORS(app)

game_state = {
    "balance": 1000,
    "dealer_cards": [],
    "player_cards": []
}



class Ranks(Enum):
    TWO = "Two"
    THREE = "Three"
    FOUR = "Four"
    FIVE = "Five"
    SIX = "Six"
    SEVEN = "Seven"
    EIGHT = "Eight"
    NINE = "Nine"
    TEN = "Ten"
    JACK = "Jack"
    QUEEN = "Queen"
    KING = "King"
    ACE = "Ace"

class Suits(Enum):
    SPADES = "Spades"
    CLUBS = "Clubs"
    DIAMONDS = "Diamonds"
    HEARTS = "Hearts" 

class Player:
    def __init__(self, score, balance, hand):
        self.score = score
        self.balance = balance
        self.hand = hand
    
    def getScore(self):
        return self.score
    
    def getBalance(self):
        return self.balance
    
    def getHand(self):
        return self.hand

    def setBalance(self, profit):
        self.balance += profit

    def playerAces(self):
        count = 0
        for card in self.hand:
            if card == Ranks.ACE:
                count += 1
        return count

class Dealer:
    def __init__(self, hand, score):
        self.hand = hand
        self.score = score

    def getScore(self):
        return self.score
    
    def getHand(self):
        return self.hand
    
    def dealerRunout(self):
        while self.score < 17:
            card = Game.deck[0]
            self.hand.append(card)
            self.score += self.calculateCardValue(card)
            Game.deck = Game.deck[1:]
    
    def calculateCardValue(self, card):
        if card[0] == Ranks.ACE:
            return 11
        elif card[0] in {Ranks.JACK, Ranks.QUEEN, Ranks.KING}:
            return 10
        else:
            return int(card[0].value)
        
    def dealerAces(self):
        count = 0
        for card in self.hand:
            if card == Ranks.ACE:
                count += 1
        return count

class Game:
    deck = [(rank, suit) for rank in Ranks for suit in Suits]
    random.shuffle(deck)
    for card in deck:
        print(f"{card[0].value} of {card[1].value}")
    print("\n")

    player = Player(0, 0, [deck[0], deck[2]])
    print("Player's hand:")
    for card in player.hand:
        print(f"{card[0].value} of {card[1].value}")
    print("\n")

    dealer = Dealer([deck[1], deck[3]], 0)
    print("Dealer's hand:")
    for card in dealer.hand:
        print(f"{card[0].value} of {card[1].value}")
    
    @app.route('/api/deal', methods=['POST'])
    def deal_cards():
        game_state["dealer_cards"] = [Game.deck[1], Game.deck[3]]
        game_state["player_cards"] = [Game.deck[0], Game.deck[2]]

        Game.deck = Game.deck[4:]

        return jsonify({
            "balance": game_state["balance"],
            "dealer_cards": [
                {"rank": game_state["dealer_cards"][0][0].value, "suit": game_state["dealer_cards"][0][1].value},
                {"rank": game_state["dealer_cards"][1][0].value, "suit": game_state["dealer_cards"][1][1].value}
            ],
            "player_cards": [
                {"rank": game_state["player_cards"][0][0].value, "suit": game_state["player_cards"][0][1].value},
                {"rank": game_state["player_cards"][1][0].value, "suit": game_state["player_cards"][1][1].value}
            ]
        })
    
    @app.route('/api/action', methods=['POSt'])
    def game_action():
        action = request.json.get('action')
        if action == 'hit':
            game_state["player_cards"].append(Game.deck[0])
            Game.deck = Game.deck[1:]
        elif action == 'stand':
            Game.dealer.dealerRunout()

        return jsonify(game_state)
    
    
    if __name__ == '__main__':
        app.run(debug=True)
    