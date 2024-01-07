import React, { useState } from 'react'
import Coin from './Coin'
import "../App.css"
import Loader from './Loader'
export default function CoinsList(props) {
    return (
        <div className='coinList'>
            <h2>Received Trade Data:</h2>
            <ul>
                {props.data.length > 0 ? props.data.map((val, index) => {
                    return (
                        <li key={index}>
                            <Coin val={val} index={index} />
                        </li>
                    )
                }) : <Loader />}
            </ul>
        </div>
    )
}
