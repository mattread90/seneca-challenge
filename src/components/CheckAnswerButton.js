import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { CORRECT_STATES } from '../actions';
import colors from '../common/colors';

export default class CheckAnswerButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    correctState: PropTypes.oneOf(Object.values(CORRECT_STATES))
  };

  constructor(props) {
    super(props);
    this.state = {
      correctState: CORRECT_STATES.NONE
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.correctState === CORRECT_STATES.CORRECT ||
      nextProps.correctState === CORRECT_STATES.INCORRECT
    ) {
      this.setState({
        correctState: nextProps.correctState
      });
      setTimeout(
        () => this.setState({ correctState: CORRECT_STATES.NONE }),
        1500
      );
    }
  }

  _animateFeedbackOverlay(callback) {
    this.state.opacity.setValue(1);
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 2000
    }).start(callback);
  }

  render() {
    const { correctState } = this.state;

    let overlayMessage;
    switch (correctState) {
      case CORRECT_STATES.CORRECT:
        overlayMessage = '🎉 Correct!';
        break;
      case CORRECT_STATES.INCORRECT:
        overlayMessage = '🤔️ Try again!';
        break;
    }

    return (
      <View>
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
        {correctState !== CORRECT_STATES.NONE &&
          <View
            style={[
              s.button,
              s.overlay,
              correctState === CORRECT_STATES.CORRECT && s.correctButton,
              correctState === CORRECT_STATES.INCORRECT && s.wrongButton
            ]}
          >
            <View style={s.content}>
              <Text style={s.text}>
                {overlayMessage}
              </Text>
            </View>
          </View>}
      </View>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  },
  correctButton: {
    backgroundColor: 'green'
  },
  wrongButton: {
    backgroundColor: 'red'
  }
});
