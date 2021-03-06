import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import AnswerSwiper from './AnswerSwiper';
import colors from '../common/colors';

export default class CauseAndEffectQuestion extends React.PureComponent {
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
    this._shuffleAnswers([
      ...props.question.wrongAnswers,
      props.question.correctAnswer
    ]);
  }

  componentWillReceiveProps(nextProps) {
    this._shuffleAnswers([
      ...nextProps.question.wrongAnswers,
      nextProps.question.correctAnswer
    ]);
  }

  _shuffleAnswers = answers => {
    this._shuffledAnswers = [...answers];

    let currentIndex = this._shuffledAnswers.length,
      tempVal,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempVal = this._shuffledAnswers[currentIndex];
      this._shuffledAnswers[currentIndex] = this._shuffledAnswers[randomIndex];
      this._shuffledAnswers[randomIndex] = tempVal;
    }
  };

  render() {
    const { cause, effect, wrongAnswers, correctAnswer } = this.props.question;
    return (
      <View style={s.container}>
        <CauseEffectBox type="cause" text={cause} />
        <FlowChartArrow />
        <AnswerSwiper
          renderInstructions={CauseEffectInstruction}
          renderAnswer={CauseEffectAnswer}
          answers={this._shuffledAnswers}
          onAnswerSelect={this.props.onAnswerSelect}
          showDots
          showArrows
        />
        <FlowChartArrow />
        <CauseEffectBox type="effect" text={effect} />
      </View>
    );
  }
}

const CauseEffectBox = ({ type, text }) =>
  <View style={[s.causeEffectBoxContainer, s.causeEffectBoxHeight]}>
    <View
      style={[
        s.causeEffectBoxTitleContainer,
        type === 'cause' ? s.causeStyle : s.effectStyle
      ]}
    >
      <Text style={s.causeEffectBoxTitleText}>
        {type === 'cause' ? 'Cause' : 'Effect'}
      </Text>
    </View>
    <View style={s.causeEffectBoxContent}>
      <Text style={s.causeEffectBoxText}>
        {text}
      </Text>
    </View>
  </View>;

const CauseEffectAnswer = ({ text }) =>
  <View style={[s.causeEffectBoxContainer, s.answerBox]}>
    <View style={[s.causeEffectBoxTitleContainer, s.linkStyle]}>
      <Text style={s.causeEffectBoxTitleText}>
        Link
      </Text>
    </View>
    <View style={s.causeEffectBoxContent}>
      <Text style={s.causeEffectAnswerText}>
        {text}
      </Text>
    </View>
  </View>;

const CauseEffectInstruction = () =>
  <View style={[s.causeEffectBoxContainer, s.answerBox]}>
    <View style={[s.causeEffectBoxContent, s.instructionsContainer]}>
      <Text style={s.causeEffectInstructionHeader}>
        Instructions:
      </Text>
      <Text style={s.causeEffectInstructionText}>
        Swipe here to select the correct
        <Text style={s.linkText}> link </Text>
        between the
        <Text style={s.causeText}> cause </Text>
        and the
        <Text style={s.effectText}> effect </Text>.
        Then tap the 'Check answer' button below.
      </Text>
    </View>
  </View>;

const FlowChartArrow = () =>
  <View style={s.flowChartArrowContainer}>
    <Text style={{ fontSize: 30 }}>⬇️</Text>
  </View>;

const CAUSE_EFFECT_TITLE_HEIGHT = 21;

const s = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  causeEffectBoxContainer: {
    marginHorizontal: 35,
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 10
  },
  causeEffectBoxHeight: {
    height: 80
  },
  causeEffectBoxTitleContainer: {
    position: 'absolute',
    width: 60,
    height: CAUSE_EFFECT_TITLE_HEIGHT,
    alignItems: 'center',
    padding: 2,
    zIndex: 1,
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  causeStyle: {
    backgroundColor: colors.causeAndEffectCause
  },
  effectStyle: {
    backgroundColor: colors.causeAndEffectEffect
  },
  linkStyle: {
    backgroundColor: colors.causeAndEffectLink
  },
  causeEffectBoxTitleText: {
    fontWeight: '100',
    color: 'white'
  },
  causeEffectBoxContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: CAUSE_EFFECT_TITLE_HEIGHT
  },
  instructionsContainer: {
    paddingTop: 10
  },
  causeEffectBoxText: {
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center'
  },
  answerBox: {
    flex: 1,
    marginHorizontal: 5
  },
  causeEffectAnswerText: {
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center'
  },
  causeEffectInstructionText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center'
  },
  causeEffectInstructionHeader: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '600',
    textAlign: 'center'
  },
  causeText: {
    fontWeight: 'bold',
    color: colors.causeAndEffectCause
  },
  linkText: {
    fontWeight: 'bold',
    color: colors.causeAndEffectLink
  },
  effectText: {
    fontWeight: 'bold',
    color: colors.causeAndEffectEffect
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
  flowChartArrowContainer: {
    alignSelf: 'center',
    margin: 5
  }
});
