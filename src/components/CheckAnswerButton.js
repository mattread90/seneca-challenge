import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../common/colors';

export default class CheckAnswerButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={s.button}>
        <View style={s.content}>
          <Text style={s.text}>
            Check answer
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    padding: 10,
    backgroundColor: colors.primaryBlue,
    borderRadius: 30
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 25,
    fontWeight: 'normal',
    color: 'white'
  }
});
