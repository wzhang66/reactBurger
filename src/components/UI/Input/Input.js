import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputELement];
  if (props.invalid) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed}/>;
      break;
    case ('select'):
    inputElement = (
      <select
        className={inputClasses.join(' ')}
        value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(option=>(
          <option key={option.value} value={option.value}>{option.displayValue}</option>
        ))}
      </select>);
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}/>;
      break;
  }
  let validationError = null;
  if (props.invalid&&props.touch) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
