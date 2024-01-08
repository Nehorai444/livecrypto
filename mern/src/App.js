import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import CoinsList from './components/CoinsList';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
function App() {
  const [data, setData] = useState([]);
  const {t} = useTranslation()


  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const ws = new WebSocket('ws://127.0.0.1:4000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server.');
    };

    ws.onmessage = (event) => {
      try {
        const tradingData = JSON.parse(event.data);
        setData(tradingData);
      } catch (error) {
        console.error('Error parsing trade data:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    document.title = t('appTitle')
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
