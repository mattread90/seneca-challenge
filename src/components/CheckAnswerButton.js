import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../common/colors';

export default class CheckAnswerButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    return (
      <TouchableOpacity
        style={[s.button, this.props.disabled && s.disabled]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={s.content}>
          <Text style={this.props.disabled ? s.disabledText : s.text}>
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
  },
  disabled: {
    backgroundColor: 'gray'
  },
  disabledText: {
    fontSize: 25,
    fontWeight: 'normal',
    color: 'lightgray'
  }
});
