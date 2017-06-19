import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnswerSwiper from './AnswerSwiper';

export default class CauseAndEffectQuestion extends React.Component {
  render() {
    return (
      <View style={s.container}>
        <CauseEffectBox type="cause" text="Interest rates rise" />
        <View style={s.answerSwiperContainer}>
          <AnswerSwiper
            renderAnswer={CauseEffectAnswer}
            answers={[
              'Consumers buy more in the shops and festivals etc',
              'Hot Money flows into the nation',
              'Hot Money flows into the nation1',
              'Hot Money flows into the nation2',
              'Hot Money flows into the nation3'
            ]}
          />
        </View>
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
        type === 'effect' && s.effectAlign
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
    <View style={s.causeEffectBoxContent}>
      <Text style={s.causeEffectAnswerText}>
        {text}
      </Text>
    </View>
  </View>;

const s = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  causeEffectBoxContainer: {
    margin: 10,
    backgroundColor: 'white',
    // borderWidth: 0.2,
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
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'limegreen'
  },
  effectAlign: {
    right: 0,
    bottom: 0
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
  answerSwiperContainer: {
    flex: 1
  },
  answerBox: {
    flex: 1,
    alignSelf: 'stretch',
    height: 80
  },
  causeEffectAnswerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
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

const CAUSE_EFFECT_TITLE_HEIGHT = 18;
