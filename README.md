# 2048

A lightweight browser version of 2048 built with plain HTML, CSS, and JavaScript.

## Play locally

Open `index.html` in any modern browser:

```powershell
Start-Process .\index.html
```

There is no build step, package install, or local server required.

## How to play

Use the arrow keys to slide the tiles around the board. When two tiles with the
same number touch, they merge into one tile and the merged value is added to your
score. Keep merging tiles until you reach 2048 or run out of moves.

Use **New Game** to reset the board. The best score is saved in browser
`localStorage`, so it persists between page reloads in the same browser.

## Features

- 4x4 2048 board
- Random `2` and `4` tile spawns after valid moves
- Score and best-score tracking
- Game-over detection when no moves remain
- Responsive layout for smaller screens
- CSS tile colors and new-tile animation

## Project structure

```text
index.html  Page markup and game container
style.css   Layout, colors, tile styling, and responsive rules
script.js   2048 game state, movement logic, scoring, and input handling
LICENSE     Apache License 2.0
```

## Development

Edit the HTML, CSS, or JavaScript files directly, then refresh the browser to
try the change. Since the project is dependency-free, it is also easy to host on
any static file server or static site platform.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE)
for details.
