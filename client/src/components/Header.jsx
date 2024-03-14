// src/components/Header.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <h1 className='rtlText'>{t('appTitle')}</h1>
    </header>
  );
};

export default Header;
