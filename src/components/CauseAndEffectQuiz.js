import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import CauseAndEffectQuestion from './CauseAndEffectQuestion';
import CheckAnswerButton from './CheckAnswerButton';

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
    }).isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Cause and Effect
          </Text>
        </View>
        <View style={styles.questionContainer}>
          <CauseAndEffectQuestion />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerInfoContainer}>
            <Text style={styles.questionNumText}>
              Question {this.props.quiz.currentQuestion + 1} /
              {' '}{this.props.quiz.questions.length}
            </Text>
          </View>

          <View style={styles.submitButtonContainer}>
            <CheckAnswerButton />
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
    paddingTop: 20,
    backgroundColor: '#e6f0fa'
  },
  headerContainer: {
    padding: 10
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
