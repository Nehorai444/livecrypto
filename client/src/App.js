import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import CoinsList from './components/CoinsList';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import pako from 'pako';

function App() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
    const ws = new WebSocket(`${protocol}${window.location.hostname}`);
    ws.binaryType = 'arraybuffer'; // Set binary type for WebSocket

    ws.onopen = () => {
      console.log('Connected to WebSocket server.');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      if (data !== undefined) {
        
        try {
          const inflatedData = pako.inflate(data, { to: 'string' }); // decompression
          setData(JSON.parse(inflatedData)); // Set the data state to the data from the server
          } catch (error) {
            console.error('Error parsing JSON:', error);
        }

      }
    };

    // Add event listener for beforeunload event to close WebSocket connection
    const handleBeforeUnload = () => {
      ws.close();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove event listener and close WebSocket connection
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      ws.close();
    };
  }, []);

  useEffect(() => {
    document.title = "LiveCrypto"
  }, [])
  return (
    <div className="App">
      <Menu />
      <Header />
      <Routes>
        <Route path="/allCoins" element={<CoinsList data={data} />} />
        <Route path="/" element={<HomePage data={data} />} />
      </Routes>


    </div>
  );
}

export default App;
