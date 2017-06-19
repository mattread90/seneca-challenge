import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnswerSwiper from './AnswerSwiper';
import colors from '../common/colors';

export default class CauseAndEffectQuestion extends React.Component {
  render() {
    return (
      <View style={s.container}>
        <CauseEffectBox type="cause" text="Interest rates rise" />
        <FlowChartArrow />
        <AnswerSwiper
          renderInstructions={CauseEffectInstruction}
          renderAnswer={CauseEffectAnswer}
          answers={[
            'Consumers buy more in the shops and festivals etc',
            'Hot Money flows into the nation',
            'Hot Money flows into the nation1',
            'Hot Money flows into the nation2',
            'Hot Money flows into the nation3'
          ]}
          onAnswerSelect={answer => console.log(answer)}
        />
        <FlowChartArrow />
        <CauseEffectBox type="effect" text="Currency exchange appreciates" />
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
    <View style={s.causeEffectBoxContent}>
      <Text style={s.causeEffectInstructionHeader}>
        Instructions:
      </Text>
      <Text style={s.causeEffectInstructionText}>
        Swipe to select the correct
        <Text style={s.linkText}> link </Text>
        between the
        <Text style={s.causeText}> cause </Text>
        and the
        <Text style={s.effectText}> effect </Text>
      </Text>
    </View>
  </View>;

const FlowChartArrow = () =>
  <View style={s.flowChartArrowContainer}>
    <Text style={{ fontSize: 30 }}>⬇️</Text>
  </View>;

const s = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  causeEffectBoxContainer: {
    marginHorizontal: 10,
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
    padding: 2
  },
  causeStyle: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.causeAndEffectCause
  },
  effectStyle: {
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.causeAndEffectEffect
  },
  linkStyle: {
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    paddingHorizontal: CAUSE_EFFECT_TITLE_HEIGHT + 5
  },
  causeEffectBoxText: {
    fontSize: 18,
    fontWeight: '200'
  },
  answerBox: {
    flex: 1,
    marginHorizontal: 5
  },
  causeEffectAnswerText: {
    fontSize: 18,
    textAlign: 'center'
  },
  causeEffectInstructionText: {
    fontSize: 18,
    textAlign: 'center'
  },
  causeEffectInstructionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
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

const CAUSE_EFFECT_TITLE_HEIGHT = 18;
