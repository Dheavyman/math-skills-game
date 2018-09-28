import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

/**
 * Timer frame component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const TimerFrame = (props) => {
  const { minutes, seconds } = props;

  /**
   * Format time
   * Add leading zero when value is less that 10
   *
   * @param {*} value - time to format
   *
   * @returns {object} Formatted time
   */
  const formatTime = value => (
    value < 10 ? `0${value}` : `${value.toString()}`
  );

  return (
    <div className="col-4 col-md-3">
      <h3 className="timer">
        <span className="minutes text-justify">
          {minutes}
          <span>m</span>
        </span>
        <span className="seconds text-justify">
          {formatTime(seconds)}
          <span>s</span>
        </span>
      </h3>
    </div>
  );
};

TimerFrame.propTypes = propTypes;

export default TimerFrame;
