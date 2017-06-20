import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Constants } from 'expo';

import CauseAndEffectQuestion from './CauseAndEffectQuestionTransitioner';
import CheckAnswerButton from './CheckAnswerButton';
import colors from '../common/colors';

export default class CauseAndEffectQuiz extends React.Component {
  static propTypes = {
    quiz: PropTypes.shape({
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          cause: PropTypes.string.isRequired,
          effect: PropTypes.string.isRequired,
          wrongAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
          correctAnswer: PropTypes.string.isRequired
        }).isRequired
      ),
      currentQuestion: PropTypes.number.isRequired,
      currentAnswer: PropTypes.string
    }).isRequired,
    onAnswerSelect: PropTypes.func,
    onConfirmAnswer: PropTypes.func,
    correctState: PropTypes.any
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Cause and Effect quiz
          </Text>
          <View style={styles.footerInfoContainer}>
            <Text style={styles.questionNumText}>
              Question {this.props.quiz.currentQuestion + 1} /
              {' '}{this.props.quiz.questions.length}
            </Text>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <CauseAndEffectQuestion
            question={
              this.props.quiz.questions[this.props.quiz.currentQuestion]
            }
            onAnswerSelect={this.props.onAnswerSelect}
          />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.submitButtonContainer}>
            <CheckAnswerButton
              onPress={this.props.onConfirmAnswer}
              disabled={!this.props.quiz.currentAnswer}
              correctState={this.props.correctState}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background
  },
  headerContainer: {
    padding: 5,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 25,
    fontWeight: '200'
  },
  questionContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  footerContainer: {
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  footerInfoContainer: {
    padding: 5
  },
  questionNumText: {
    fontWeight: '100'
  },
  submitButtonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  }
});
