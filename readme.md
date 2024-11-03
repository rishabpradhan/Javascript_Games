# Pong Game

A simple, two-player Pong game built with HTML5 Canvas and JavaScript. Players control paddles on each side of the screen to bounce the ball back and forth, scoring points when the opponent misses.

## Features

- Two-player mode (left player uses **Arrow Keys**, right player uses **W** and **S** keys)
- Ball speed increases after each hit
- Dotted center line for aesthetic appeal
- Game stops when one player reaches 5 points
- Visual score display for each player

## Demo

You can view and play the game by opening the `index.html` file in your browser.

## How to Play

1. Open the game.
2. Press the **E** key to start.
3. **Left Paddle Controls:**
   - Move up: **Arrow Up**
   - Move down: **Arrow Down**
4. **Right Paddle Controls:**
   - Move up: **W**
   - Move down: **S**

The goal is to prevent the ball from passing your paddle. The game ends when either player scores 5 points.

## Code Overview

### Key Files

- `index.html`: Contains the basic HTML structure for the game.
- `script.js`: Main JavaScript file handling game logic, including movement, collision detection, and scoring.

### Main Functions

- `set_game()`: Initializes the game and displays the start screen.
- `draw()`: Renders the paddles, ball, score, and center line.
- `movement()`: Updates positions of the ball and paddles based on user input and game logic.
- `drawDottedLine()`: Draws a dotted line in the center of the canvas for game aesthetics.
- `ballResetLeft()` / `ballResetRight()`: Resets ball position and increases the score when a player misses the ball.

### Requirements

- HTML5
- JavaScript

Feel free for any modifications.Happy Coding.

Developed By Rishab Pradhan
