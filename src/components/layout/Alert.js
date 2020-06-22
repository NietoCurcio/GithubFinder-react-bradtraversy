import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    //   notice how we didn't need curly braces, because the ternary is not inside a DOM element
    alert !== null && (
      <div className={`alert alert-${alert['type']}`}>
        <i className='fas fa-info circle'></i> {alert.msg}
      </div>
    )
  );
};

export default Alert;
