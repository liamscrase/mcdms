import React from 'react';
import './TopHeader.scss';

const TopHeader: React.FC = () => {
  return (
    <header className="top-header" role="banner">
      <div className="top-header__logo" aria-label="Dealership logo">
        <img src="/images/logo.jpg" alt="Dealership logo" className="top-header__logo-img" />
      </div>
      <div className="top-header__ad" aria-label="Advertisement">
        <img src="/images/ad.jpg" alt="Advertisement" className="top-header__ad-img" />
      </div>
    </header>
  );
};

export default TopHeader;
