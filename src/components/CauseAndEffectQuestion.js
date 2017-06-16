import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CauseAndEffectQuestion extends React.Component {
  render() {
    return (
      <View style={s.container}>
        <CauseEffectBox type="cause" text="Interest rates rise" />
        <View style={s.content}>
          <Text style={s.text}>
            Here's a question
          </Text>
        </View>
        <CauseEffectBox type="effect" text="Currency exchange appreciates" />
      </View>
    );
  }
}

const CauseEffectBox = ({ type, text }) =>
  <View style={s.causeEffectBoxContainer}>
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

const s = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  causeEffectBoxContainer: {
    alignSelf: 'stretch',
    margin: 10,
    backgroundColor: 'white',
    height: 80,
    // borderWidth: 0.2,
    borderRadius: 10
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
