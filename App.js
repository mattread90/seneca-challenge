import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';
import CauseAndEffectQuiz from './src/containers/CauseAndEffectQuiz';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CauseAndEffectQuiz />
      </Provider>
    );
  }
}
