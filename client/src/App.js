///////////////////////////////////////////////////////////////////////////////////MODULES
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
/////////////////////////////////////////////////////////////////////////////////////STORE
import configureStore from './store/configureStore';
///////////////////////////////////////////////////////////////////////////////////ACTIONS
import { getThings } from './actions/things';
////////////////////////////////////////////////////////////////////////////////COMPONENTS
import HomePage from './components/HomePage';
////////////////////////////////////////////////////////////////////////////STORE TO REACT
const store = configureStore();
const App = () => {
  useEffect(() => {
    const request = async () => {
      try {
        await store.dispatch(getThings());
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, []);

  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
