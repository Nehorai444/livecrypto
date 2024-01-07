# Binance WebSocket Data Dashboard

## Overview

This project is a React.js web application that fetches real-time cryptocurrency data from Binance WebSocket and displays it to the user. The application also utilizes WebSocket to communicate between the client and server. Additionally, the collected data is stored in MongoDB.

## Project Structure

```markdown
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── Coin.jsx
│   │   ├── CoinsList.jsx
│   │   ├── Footer.jsx
│   │   ├── HomePage.jsx
│   │   ├── Loader.jsx
│   │   ├── Menu.jsx
│   │   └── shelves
│   │       └── Graph.jsx
│   ├── index.css
│   ├── index.js
│   ├── library
│   │   └── ApiRequests.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
└── server
    ├── binanceWebsocket.js
    ├── coins.js
    ├── convertData.js
    ├── package.json
    ├── package-lock.json
    └── server.js


Getting Started
1. Clone the repository: git clone https://github.com/Nehorai444/binance-websocket-dashboard.git
2. Navigate to the project directory: cd binance-websocket-dashboard
3. Install dependencies: npm install
4. Start the development server: npm start

This will launch the React.js application. Additionally, ensure that MongoDB is running for data storage.


Server Setup
1. Navigate to the server directory: cd server
2. Install server dependencies: npm install
3. Start the server: node server.js
5. node binanceWebsocket.js
This will start the WebSocket server and handle data conversion and storage.

Features
*Real-time cryptocurrency data from Binance WebSocket.
*WebSocket communication between the client and server.
*Data storage in MongoDB.
*Graphical representation of cryptocurrency data.

Technologies Used
#React.js
#Binance WebSocket API
#MongoDB
#Node.js
#Express.js
#WebSocket library

License
This project is licensed under the MIT License.

Acknowledgments
*Binance API Documentation
*React
*Node.js
*Express.js

WebSocket library
Happy coding!
