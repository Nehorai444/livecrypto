import React, { useContext, useEffect, useState } from 'react'
import Graph from './shelves/Graph';
import { ApiRequest } from '../library/Utilities';

export default function Coin(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dataCoin, setDataCoin] = useState([]);
    const [flag, setFlag] = useState(false);

    function onClick() {
        if (!startDate || !endDate) return
        ApiRequest.search(startDate, endDate, props.val.tradingPair)
            .then(res => {
                setDataCoin(res.data);
                setFlag(!flag);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='coin'>
            <h3>Trade {props.index + 1}:</h3>
            <strong>Symbol:</strong> ${props.val.tradingPair}<br />
            <strong>Close Price:</strong> ${props.val.currentPrice}<br />
            <strong>Open Price:</strong> ${props.val.openingPrice}<br />
            <strong>High Price:</strong> ${props.val.highestPrice24h}<br />
            <strong>Low Price:</strong> ${props.val.lowestPrice24h}<br />
            <strong>Total Traded Base Asset Volume:</strong> ${props.val.totalTradedVolume}<br />
            <strong>Total Traded Quote Asset Volume:</strong> ${props.val.totalTradedQuoteVolume}<br />
            <label htmlFor="startDate">Start Date:</label>
            <input type="datetime-local" id="startDate" name="startDate" onChange={e => setStartDate(e.target.value)} /><br />
            <label htmlFor="endDate">End Date:</label>
            <input type="datetime-local" id="endDate" name="endDate" onChange={e => setEndDate(e.target.value)} />
            {!flag && <button id="searchButton" onClick={onClick}>Search</button>}
            {flag && <Graph data={dataCoin} setFlag={setFlag} />}
        </div>
    )
}
