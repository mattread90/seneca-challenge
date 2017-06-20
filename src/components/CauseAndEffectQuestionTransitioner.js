import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import CauseAndEffectQuestion from './CauseAndEffectQuestion';

export default class CauseAndEffectQuestionTransitioner extends React.Component {
  static propTypes = {
    question: PropTypes.shape({
      cause: PropTypes.string.isRequired,
      effect: PropTypes.string.isRequired,
      wrongAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired
    }).isRequired,
    onAnswerSelect: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._screenWidth = Dimensions.get('window').width;
    this.state = {
      question1: {
        question: props.question,
        shift: new Animated.Value(0)
      },
      question2: {
        question: null,
        shift: new Animated.Value(this._screenWidth)
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentQuestion =
      this.state.question1.question || this.state.question2.question;
    if (nextProps.question !== currentQuestion) {
      if (!this.state.question1.question) {
        this._updateQuestion('question1', nextProps.question);
        this._animateTransition('question2', 'question1', () =>
          this._updateQuestion('question2', null)
        );
      } else if (!this.state.question2.question) {
        this._updateQuestion('question2', nextProps.question);
        this._animateTransition('question1', 'question2', () =>
          this._updateQuestion('question1', null)
        );
      }
    }
  }

  _updateQuestion(questionKey, question) {
    this.setState(prevState => ({
      ...prevState,
      [questionKey]: {
        ...prevState[questionKey],
        question: question
      }
    }));
  }

  _animateTransition(currentQuestionKey, nextQuestionKey, callback) {
    this.state[nextQuestionKey].shift.setValue(this._screenWidth);

    Animated.sequence([
      Animated.delay(500),
      Animated.stagger(500, [
        Animated.spring(this.state[currentQuestionKey].shift, {
          toValue: -this._screenWidth
        }),
        Animated.spring(this.state[nextQuestionKey].shift, {
          toValue: 0
        })
      ])
    ]).start(callback);
  }

  render() {
    return (
      <View style={s.container}>
        <SlidableQuestionContainer
          question={this.state.question1.question}
          onAnswerSelect={this.props.onAnswerSelect}
          shiftPos={this.state.question1.shift}
        />
        <SlidableQuestionContainer
          question={this.state.question2.question}
          onAnswerSelect={this.props.onAnswerSelect}
          shiftPos={this.state.question2.shift}
        />
      </View>
    );
  }
}

class SlidableQuestionContainer extends React.Component {
  static propTypes = {
    question: PropTypes.object,
    onAnswerSelect: PropTypes.func,
    shiftPos: PropTypes.instanceOf(Animated.Value)
  };

  render() {
    if (!this.props.question) return null;

    const shift = { transform: [{ translateX: this.props.shiftPos }] };

    return (
      <Animated.View style={[s.questionContainer, shift]}>
        <CauseAndEffectQuestion
          question={this.props.question}
          onAnswerSelect={this.props.onAnswerSelect}
        />
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  questionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
