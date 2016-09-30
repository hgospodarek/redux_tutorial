import { createStore, applyMiddleware } from 'redux';
// import { loadState, saveState } from './components/localStorage';
// import throttle from 'lodash/throttle';
import todoApp from './reducers';
import promise from 'redux-promise';
import createLogger from 'redux-logger';


// the logger and promise middlewares below are now available
// as NPM packages

// const logger = (store) => (nextDispatch) => {
//   if (!console.group) {
//     return nextDispatch;
//   }
//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: gray', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnValue = nextDispatch(action);
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   };
// }
//
// const promise = (store) => (nextDispatch) => (action) => {
//   if (typeof action.then === 'function') {
//     return action.then(nextDispatch);
//   }
//   return nextDispatch(action);
// };
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// }

// now removing persisted state to add a fake backend to demonstrate AJAX calls
// note, to use persisted state with middlewares, must get the persisted
// state before applying middlewares, as shown below in createStore



const configureStore = () => {
  // const persistedState = loadState();
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    todoApp,
    // persistedState,
    applyMiddleware(...middlewares)
  );
  // wrapDispatchWithMiddlewares(store, middlewares);


  // store.subscribe(throttle(() => {
  //   saveState({
  //     todos: store.getState().todos
  //   });
  // }, 1000));

};

export default configureStore;
