# Binance WebSocket Data Dashboard

This project is a dashboard for displaying real-time data from the Binance WebSocket API.

## Client

### Directory Structure

```
./client
├── build
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── static
│       ├── css
│       │   ├── main.b2dc0676.css
│       │   └── main.b2dc0676.css.map
│       └── js
│           ├── main.19e27747.js
│           ├── main.19e27747.js.LICENSE.txt
│           └── main.19e27747.js.map
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── Coin.jsx
    │   ├── CoinsList.jsx
    │   ├── Header.jsx
    │   ├── HomePage.jsx
    │   ├── Loader.jsx
    │   ├── Menu.jsx
    │   └── shelves
    │       └── Graph.jsx
    ├── i18n.js
    ├── index.js
    ├── library
    │   └── Utilities.js
    ├── locales
    │   ├── en.json
    │   ├── es.json
    │   ├── he.json
    │   └── zh.json
    ├── logo.svg
    └── setupTests.js
```

## Server

### Directory Structure

```
./server
├── binanceWebsocket.js
├── coins.js
├── convertData.js
├── logging.js
├── package.json
├── package-lock.json
└── server.js
```

## Installation

To install the required dependencies, navigate to the client and server directories and run:

```
npm install
```

## Usage

To start the client and server, run the following commands in separate terminal windows:

```
cd client
npm start
```

```
cd server
node server.js
```