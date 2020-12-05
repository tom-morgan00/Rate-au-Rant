import React from 'react';

export default function StarRating({ rating }) {
  const renderStars = (num) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      //num is bigger than i - WHOLE
      if (num >= i) {
        stars.push(<i key={i} className="fas fa-star text-warning" />);
        //num is smaller than i - EMPTY
      } else if (num >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-warning" />);
      } else {
        stars.push(<i key={i} className="far fa-star text-warning" />);
      }
    }
    return stars;
  };

  return <div>{renderStars(rating)}</div>;
}
