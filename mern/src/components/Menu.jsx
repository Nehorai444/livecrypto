import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
export default function Menu() {
  const { t, i18n } = useTranslation();

  // Function to handle language change
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <div className="menu-container">
      <div>
        <button className="menu-button">{t('menuButtonText')}</button>
        <div className="dropdown-menu">
          <ul>
            <li><Link to="/allCoins" className='menu-item'>{t('allCoinsMenuItem')}</Link></li>
            <li><Link to="/" className='menu-item'>{t('top10CoinsMenuItem')}</Link></li>
          </ul>
        </div>
      </div>
      <select className="language-select" onChange={handleLanguageChange} value={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="zh">中文</option>
        <option value="he">עברית</option>
      </select>
    </div>
  )
}
