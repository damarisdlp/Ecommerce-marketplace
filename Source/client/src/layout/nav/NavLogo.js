import React from 'react';

const NavLogo = () => {
  return (
    <div className="logo position-relative">
      {/* eslint-disable-next-line */}
      <img
        src="/img/logo/2LetItGoLogo.png"
        alt="logo"
        style={{ marginTop: '75px', height: '87px', width: '175px', marginBottom: '50px' }}
      />
      <div className="img" />
    </div>
  );
};

export default React.memo(NavLogo);
