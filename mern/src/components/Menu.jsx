import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div class="menu-container">
      <button class="menu-button">Menu</button>
      <div class="dropdown-menu">
        <ul>
          <li><Link to="/allCoins" className='menu-item'>All Coins</Link></li>
          <li><Link to="/" className='menu-item'>Top 10 expensive coins</Link></li>
        </ul>
      </div>
    </div>
  )
}
