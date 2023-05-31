# Tic-Tac-Toe Game

>This is the old age Tic-Tac-Toe game from back when _Dinosaurs_ romed the earth, being played on the browser.

###
## :toolbox: Technologies Used
 - **JavaScript** For the functionality of the game
 - **TypeScript** To add more power to JavaScript and ensure more secure code
 - **HTML** Serving as the skeleton for the web application
 - **CSS** Giving the look and feel for the web application

## System Requirements
 - `NodeJS v12.20 or later`
 - Have a web server of your liking, Nginx or Apache work fine
 
### Prerequisites

Make sure you have the following tools on your machine:

 - A code editor (I used VS Code)
 - A terminal or integrated terminal with your code editor
 - Docker Desktop ( _optional_ ): [Docker](https://docs.docker.com/get-docker/)
 - PlayWright: [PlayWright](https://playwright.dev/)
 - ViTest: [ViTest](https://vitest.dev/)

## Project Structure

```sh
.
├── Dockerfile
├── README.md
├── dist
│   └── script.js
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── src
│   ├── pages
│   │   └── example.page.ts
│   ├── script.js
│   ├── script.ts
│   ├── styles.css
│   ├── tests
│   │   ├── example.spec.ts
│   │   ├── ticTacToe.end2end.js
│   │   └── ticTacToe.test.js
│   └── tsconfig.json
└── yaml
```

### First Time Setup locally
1. Clone the repository
`git clone https://github.com/tzone85/tic-tac-toe.git`
2. Change to the repository's directory
`cd tic-tac-toe`
3. `npm install`
4. It's recommended to use your own web server (when running Windows). But as mentioned above you can use docker if on Linux or Mac. For some reason I got no errors when running on the mac, as compared to when I was on Windows. Ensure that your Docker engine is up and running.
```sh
docker build -t tic-tac-toe-app .
docker run -d -p 8080:80 tic-tac-toe
localhost:8080
```

### :fire: Now the fun starts

## _Happy Playing_ 

# Please note
> The last time I used Github pages, it was free with no need for a 
> custom domain name and having to pay fo rit. The prices are good
> but I'm in no positon to purchase a domain name right now.