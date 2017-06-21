import React from 'react';
export const Input = props =>
  (<input
    key={Math.random()}
    type={props.type}
    {...props.options}
    className={props.className}
    onBlur={props.onBlur}
    onClick={props.onClick}
    pattern={props.pattern}
    disabled={props.disabled}
    checked={props.checked}
    onChange={props.onChange}
  />
    );

export default Input;