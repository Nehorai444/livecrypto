/**
 * Component for displaying detailed information about a specific cryptocurrency.
 * 
 * This component renders details such as trading pair, close price, open price,
 * high price, low price, total traded base asset volume, and total traded quote asset volume.
 * It also provides inputs for selecting start and end dates for data retrieval, and a button
 * to trigger the data search. Upon successful search, it displays a graph component with the retrieved data.
 * 
 * @module Coin
 * @param {Object} props - Props passed to the component.
 * @param {Object} val - Object containing details of the cryptocurrency.
 * @param {number} index - Index of the cryptocurrency in the list.
 * @requires react
 * @requires react-i18next
 * @requires Graph
 * @requires Loader
 * @requires ApiRequest
 */
import React, { useState } from 'react';
import Graph from './shelves/Graph';
import { ApiRequest } from '../library/Utilities';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';

export default function Coin(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const {val, flag, index, setDataCoin, setFlag} = props.value;
    // Function to format the price
    function getFormatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }

    function onClick() {
        // Check if the start date and end date are not empty
        if (!startDate || !endDate) return;

        setIsLoading(true);

        // Call the search function from the ApiRequest library
        ApiRequest.search(startDate, endDate, val.tradingPair)
            .then(res => {
                setDataCoin(res.data); // Set the dataCoin state to the data from the server
                setIsLoading(false);
                setFlag(!flag);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (       
        <div className='coin'>
            <h3 className={i18n.language === "he" ? "rtlText" : "ltrText"}>{t('tradeTitle')} {index + 1}:</h3>
            <div className="rtlText">
                <strong>{t('symbol')}:</strong> {val.tradingPair}<br />
            </div>
            <strong>{t('closePrice')}:</strong> {getFormatPrice(val.currentPrice)}<br />
            <strong>{t('openPrice')}:</strong> {getFormatPrice(val.openingPrice)}<br />
            <strong>{t('highPrice')}:</strong> {getFormatPrice(val.highestPrice24h)}<br />
            <strong>{t('lowPrice')}:</strong> {getFormatPrice(val.lowestPrice24h)}<br />
            <strong>{t('totalTradedBaseAssetVolume')}:</strong> {getFormatPrice(val.totalTradedVolume)}<br />
            <strong>{t('totalTradedQuoteAssetVolume')}:</strong> {getFormatPrice(val.totalTradedQuoteVolume)}<br />
            <div className={i18n.language === "he" ? "rtlText" : "ltrText"}>
                <label htmlFor="startDate">{t('startDateLabel')}:</label> &nbsp;
                <input type="datetime-local" id="startDate" name="startDate" onChange={e => setStartDate(e.target.value)} /><br />
                <label htmlFor="endDate">{t('endDateLabel')}:</label> &nbsp;
                <input type="datetime-local" id="endDate" name="endDate" onChange={e => setEndDate(e.target.value)} />
            </div> <br />
            {!flag && <button id="searchButton" onClick={onClick}>{t('searchButton')}</button>}
            {isLoading && <Loader />}
            

        </div>
        
    );
}
