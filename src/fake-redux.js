// createStore <-- reducer
  // store: subscribe, getState, dispatch

export const createStore = (reducer) => {

  let currentState = reducer(undefined, { type: '@@INIT' });
  let listeners = [];

  return {
      getState: () => currentState,
      dispatch: action => {
        currentState = reducer(currentState, action);
        listeners.forEach(fn => fn());
      },
      subscribe: function (listener) {
        listeners = listeners.concat([listener]);
        return () => {
          listeners = listeners.filter(fn => fn !== listener);
        };
      }
  };

};



