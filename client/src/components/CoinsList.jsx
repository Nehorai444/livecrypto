/**
 * Component for displaying a list of cryptocurrency trading data.
 * 
 * This component receives an array of cryptocurrency trading data as props and renders
 * a list of `Coin` components for each item in the array. It also displays a loader component
 * while waiting for the data to be received.
 * 
 * @module CoinsList
 * @param {Object} props - Props passed to the component.
 * @param {Array} props.data - Array of cryptocurrency trading data.
 * @requires react
 * @requires Coin
 * @requires Loader
 * @requires react-i18next
 */
import React, { useState } from 'react';
import Coin from './Coin';
import "../App.css";
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import Graph from './shelves/Graph';

export default function CoinsList(props) {
    const { t } = useTranslation();
    const [flag, setFlag] = useState(false);
    const [dataCoin, setDataCoin] = useState([]);

    if (flag) return <Graph data={dataCoin} setFlag={setFlag} />
    else return (
        <div className='coinList'>
            <h2 id='titleCoinList'>{t('receivedTradeDataTitle')}</h2>
            <ul>
                {props.data.length > 0 ? props.data.map((val, index) => ( // If the data is received, map through it and create a Coin component for each item
                    <li key={index}>
                        <Coin value={{val,flag, setFlag, setDataCoin, index}} key={index} />
                    </li>
                )) : <Loader />}
            </ul>
        </div>
    );
}
