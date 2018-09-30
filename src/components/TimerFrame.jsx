import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  countdownRunning: PropTypes.bool.isRequired,
  handleChangeTime: PropTypes.func.isRequired,
};

/**
 * Timer frame component
 *
 * @param {object} props - Properties passed to component
 *
 * @returns {object} React element
 */
const TimerFrame = (props) => {
  const {
    minutes,
    seconds,
    countdownRunning,
    handleChangeTime
  } = props;

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
      <div className="timer">
        <h3>
          <span className="minutes text-justify">
            {minutes}
            <span className="minutes-sign">m</span>
          </span>
          <span className="seconds text-justify">
            {formatTime(seconds)}
            <span className="seconds-sign">s</span>
          </span>
        </h3>
        {!countdownRunning
          && (
          <div className="btn-group-vertical set-time">
            <button
              type="button"
              name="increase"
              className="btn btn-sm"
              onClick={handleChangeTime}
            >
              <i className="fa fa-angle-up" />
            </button>
            <button
              type="button"
              name="decrease"
              className="btn btn-sm"
              onClick={handleChangeTime}
            >
              <i className="fa fa-angle-down" />
            </button>
          </div>
          )
        }
      </div>
    </div>
  );
};

TimerFrame.propTypes = propTypes;

export default TimerFrame;
