from flask import Flask
from enum import Enum
import random

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

class Dealer:
    def __init__(self, hand, score):
        self.hand = hand
        self.score = score

    def getScore(self):
        return self.score
    
    def getHand(self):
        return self.hand

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

    dealer = Dealer([deck[1], deck[3]])
    print("Dealer's hand:")
    for card in dealer.hand:
        print(f"{card[0].value} of {card[1].value}")
    
    