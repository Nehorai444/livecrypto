```markdown
# Binance WebSocket Data Visualization

Welcome to the Binance WebSocket Data Visualization project! This application fetches real-time cryptocurrency data from Binance WebSocket, displays it to the user using WebSocket, and saves the data in MongoDB. Users can inquire about specific coins, and the application will generate a graph depicting the coin's performance at the requested time.

## Project Structure

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
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── Coin.jsx
│   │   ├── CoinsList.jsx
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── Loader.jsx
│   │   ├── Menu.jsx
│   │   └── shelves
│   │       └── Graph.jsx
│   ├── i18n.js
│   ├── index.css
│   ├── index.js
│   ├── library
│   │   └── Utilities.js
│   ├── locales
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── he.json
│   │   └── zh.json
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
└── server
    ├── binanceWebsocket.js
    ├── coins.js
    ├── convertData.js
    ├── logging.js
    ├── package.json
    ├── package-lock.json
    └── server.js
```

## Server

The server is the heart of this project, utilizing WebSocket communication for real-time data and logging. Below are the key server files:

- **`server.js`**: The main entry point for the server.
- **`binanceWebsocket.js`**: Manages the Binance WebSocket communication, receiving data from the Binance WebSocket and processing it for the application.
- **`coins.js`**: Handles the logic related to cryptocurrency data and interactions.
- **`convertData.js`**: Converts and formats data as needed for the application.
- **`logging.js`**: Manages server-side logging for monitoring and debugging.

## Internationalization (i18n)

The application supports multiple languages. Language files are located in the `locales` directory. Currently supported languages include English (`en.json`), Spanish (`es.json`), Hebrew (`he.json`), and Chinese (`zh.json`).

To add more languages, create a new JSON file in the `locales` directory and import it in the `i18n.js` file.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/binance-websocket-data-viz.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd binance-websocket-data-viz
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

    This will launch the React.js application. Make sure to have MongoDB running for data storage.

## Configuration

- Configure Binance WebSocket connection in `src/App.js`.
- MongoDB connection is configured in the backend.
- Adjust logging configurations in `logging.js` based on your preferences.

## Usage

1. Open your browser and visit `http://localhost:3000`.
2. Explore real-time cryptocurrency data and utilize WebSocket features.
3. Inquire about specific coins to view performance graphs.

## Technologies Used

- React.js
- Binance WebSocket API
- MongoDB
- Node.js
- WebSocket library

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Binance API Documentation](https://binance-docs.github.io/apidocs/spot/en/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)

Happy coding!
