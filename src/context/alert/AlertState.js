// actions
// with context here besides actions have initalState as well
import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initalState = null;
  //   { but we could to that, but as this is only a piece of state we can just set to null
  //     alert: null
  //   };

  const [state, dispatch] = useReducer(AlertReducer, initalState);

  // Set Alert
  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        // available to entire app
      }}
    >
      {props.children}
      {/* wrapp the entire app in this provider */}
    </AlertContext.Provider>
  );
};

export default AlertState;
