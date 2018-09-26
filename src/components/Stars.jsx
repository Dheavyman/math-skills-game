import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  numberOfStars: PropTypes.number.isRequired
};

/**
 * Stars component
 *
 * @param {object} props - Properties passed to component
 * @returns {object} React element
 */
const Stars = (props) => {
  const { numberOfStars } = props;

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

Stars.propTypes = propTypes;

export default Stars;
