import React from 'react';

export default function Header() {
  return (
    <div className="p-5">
      <h1 className="font-weight-light display-1 text-center">
        <span className="icon-burger">
          <i className="fas fa-hamburger" />
        </span>{' '}
        Rate-au-Rant{' '}
        <span className="icon-utensils">
          <i className="fas fa-utensils" />
        </span>
      </h1>
    </div>
  );
}
