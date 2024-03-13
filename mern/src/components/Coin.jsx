import React, { useState } from 'react'
import Graph from './shelves/Graph';
import { ApiRequest } from '../library/Utilities';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';

export default function Coin(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dataCoin, setDataCoin] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
  
    // Function to format the price
    function getFormatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }

    function onClick() {
        // Check if the start date and end date are not empty
        if (!startDate || !endDate) return

        setIsLoading(true)

        // Call the search function from the ApiRequest library
        ApiRequest.search(startDate, endDate, props.val.tradingPair)
            .then(res => {
                setDataCoin(res.data); // Set the dataCoin state to the data from the server
                setIsLoading(false);
                setFlag(!flag);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='coin'>
            <h3 className={i18n.language === "he" ? "rtlText" : "ltrText"}>{t('tradeTitle')} {props.index + 1}:</h3>
            <div className="rtlText">
                <strong>{t('symbol')}:</strong> {props.val.tradingPair}<br />
            </div>
            <strong>{t('closePrice')}:</strong> {getFormatPrice(props.val.currentPrice)}<br />
            <strong>{t('openPrice')}:</strong> {getFormatPrice(props.val.openingPrice)}<br />
            <strong>{t('highPrice')}:</strong> {getFormatPrice(props.val.highestPrice24h)}<br />
            <strong>{t('lowPrice')}:</strong> {getFormatPrice(props.val.lowestPrice24h)}<br />
            <strong>{t('totalTradedBaseAssetVolume')}:</strong> {getFormatPrice(props.val.totalTradedVolume)}<br />
            <strong>{t('totalTradedQuoteAssetVolume')}:</strong> {getFormatPrice(props.val.totalTradedQuoteVolume)}<br />
            <div className={i18n.language === "he" ? "rtlText" : "ltrText"}>
                <label htmlFor="startDate">{t('startDateLabel')}:</label> &nbsp;
                <input type="datetime-local" id="startDate" name="startDate" onChange={e => setStartDate(e.target.value)} /><br />
                <label htmlFor="endDate">{t('endDateLabel')}:</label> &nbsp;
                <input type="datetime-local" id="endDate" name="endDate" onChange={e => setEndDate(e.target.value)} />
            </div> <br />
            {!flag && <button id="searchButton" onClick={onClick}>{t('searchButton')}</button>}
            {isLoading && <Loader />}
            {flag && <Graph data={dataCoin} setFlag={setFlag} />}
        </div>
    )
}
