import React from 'react';
import propTypes from 'prop-types';

function Button({ buttonClass, buttonStyle, title, type, disabled, handleClick }) {
    const onClick = e => {
        e.preventDefault();
        if (handleClick) {
            handleClick();
        }
    };
    
    return (
      <button
        type={type}
        className={buttonClass}
        title={title}
        onClick={onClick}
        disabled={disabled}
        style={buttonStyle}
      >
          {title}
      </button>
    );
}

Button.propTypes = {
    handleClick: propTypes.func,
    type: propTypes.string,
    title: propTypes.string,
    buttonClass: propTypes.string,
    buttonStyle: propTypes.object,
    disabled: propTypes.bool,
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
    buttonClass: 'btn btn-light'
};

export default Button;
