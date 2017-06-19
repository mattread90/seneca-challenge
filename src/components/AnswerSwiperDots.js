import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../common/colors';

export default (AnswerSwiperDots = ({ current, total }) => {
  const dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(<Dot key={i} current={i === current} />);
  }
  return (
    <View style={s.container}>
      {dots}
    </View>
  );
});

const Dot = ({ current }) => {
  return <View style={current ? s.dotSelected : s.dot} />;
};

const s = StyleSheet.create({
  container: {
    height: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 5
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'lightgray',
    margin: 2
  },
  dotSelected: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryBlue,
    margin: 2
  }
});
