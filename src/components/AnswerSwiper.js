import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import AnswerSwiperDots from './AnswerSwiperDots';

export default class AnswerSwiper extends React.Component {
  static propTypes = {
    renderAnswer: PropTypes.func.isRequired,
    renderInstructions: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelect: PropTypes.func,
    showDots: PropTypes.bool
  };

  static defaultProps = {
    showDots: true
  };

  _transformAnswers = (answers, hasInstructions) => {
    const initial = hasInstructions ? [{ key: 'instruction' }] : [];
    return answers.reduce((answers, answer) => {
      answers.push({ key: answer, text: answer });
      return answers;
    }, initial);
  };

  constructor(props) {
    super();
    this.state = {
      answers: this._transformAnswers(props.answers, props.renderInstructions),
      screenWidth: Dimensions.get('window').width,
      currentIndex: 0
    };
    !props.renderInstructions && props.onAnswerSelect(props.answers[0]);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      answers: this._transformAnswers(
        nextProps.answers,
        nextProps.renderInstructions
      )
    });
  }

  _renderItem = ({ item, index }) => {
    const toRender = this.props.renderInstructions && index === 0
      ? this.props.renderInstructions()
      : this.props.renderAnswer(item);
    return (
      <View style={[s.answerWrapper, { width: this.state.screenWidth - 60 }]}>
        {toRender}
      </View>
    );
  };

  _onScrollEndDrag = e => {
    // This stops user scrolling past the last item
    if (
      e.nativeEvent.contentOffset.x >
      30 + (this.state.screenWidth - 60) * (this.state.answers.length - 1)
    ) {
      this.setState({ overscrolled: true });
      this._list.scrollToIndex({
        index: this.state.answers.length - 1,
        viewPostion: 0.5
      });
    }
  };

  _getItemLayout = (data, index) => {
    return {
      length: this.state.screenWidth - 60,
      offset: (this.state.screenWidth - 60) * index,
      index
    };
  };

  _onScrollMomentumEnd = e => {
    if (this.state.overscrolled) {
      this.setState({ overscrolled: false });
      return;
    }

    const instructionsModifier = this.props.renderInstructions ? 1 : 0;

    const index = Math.floor(
      e.nativeEvent.contentOffset.x / (this.state.screenWidth - 60)
    );
    const answerIndex = index - instructionsModifier;

    if (answerIndex < this.props.answers.length) {
      this.props.onAnswerSelect &&
        this.props.onAnswerSelect(this.props.answers[answerIndex]);
    }

    this.setState({
      currentIndex: index
    });
  };

  _listRef = ref => (this._list = ref);

  render() {
    return (
      <View style={s.container}>
        <FlatList
          ref={this._listRef}
          style={[s.list, { width: this.state.screenWidth - 60 }]}
          ListHeaderComponent={EndBuffer}
          renderItem={this._renderItem}
          data={this.state.answers}
          horizontal
          pagingEnabled
          onScrollEndDrag={this._onScrollEndDrag}
          onMomentumScrollEnd={this._onScrollMomentumEnd}
          getItemLayout={this._getItemLayout}
          showsHorizontalScrollIndicator={false}
        />
        {this.props.showDots &&
          <AnswerSwiperDots
            current={this.state.currentIndex}
            total={this.state.answers.length}
          />}
      </View>
    );
  }
}

const EndBuffer = () => <View style={{ width: 30 }} />;

const s = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center'
  },
  list: {
    overflow: 'visible'
  },
  answerWrapper: {
    flex: 1
  }
});
