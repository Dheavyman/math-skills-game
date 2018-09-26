
import React from 'react';

/**
 * Stars component
 *
 * @returns {object} React element
 */
const Stars = () => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  return (
    <div className="col-5">
      {Array.from({ length: numberOfStars }, (_, index) => index + 1).map(
        (star, index) => (
          <i key={index.toString()} className="fa fa-star" />
        )
      )}
    </div>
  );
};

export default Stars;
