import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { Entypo } from '@expo/vector-icons';

import AnswerSwiperDots from './AnswerSwiperDots';
import colors from '../common/colors';

export default class AnswerSwiper extends React.Component {
  static propTypes = {
    renderAnswer: PropTypes.func.isRequired,
    renderInstructions: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelect: PropTypes.func,
    showDots: PropTypes.bool,
    showArrows: PropTypes.bool
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
      <View style={[s.answerWrapper, { width: this._answerWidth() }]}>
        {toRender}
      </View>
    );
  };

  _onScrollEndDrag = e => {
    // This stops user scrolling past the last item
    if (
      e.nativeEvent.contentOffset.x >
      BUFFER_WIDTH + this._answerWidth() * (this.state.answers.length - 1)
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
      length: this._answerWidth(),
      offset: this._answerWidth() * index,
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
      e.nativeEvent.contentOffset.x / this._answerWidth()
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

  _scrollLeft = () =>
    this.state.currentIndex > 0 &&
    this._list.scrollToIndex({
      index: this.state.currentIndex - 1,
      viewPostion: 0.5
    });

  _scrollRight = () =>
    this.state.currentIndex < this.state.answers.length - 1 &&
    this._list.scrollToIndex({
      index: this.state.currentIndex + 1,
      viewPostion: 0.5
    });

  _listRef = ref => (this._list = ref);

  _answerWidth = () => this.state.screenWidth - HORIZONTAL_INSET;

  render() {
    return (
      <View style={s.container}>
        <View style={s.innerContainer}>
          <FlatList
            ref={this._listRef}
            style={[s.list, { width: this._answerWidth() }]}
            ListHeaderComponent={EndBuffer}
            renderItem={this._renderItem}
            data={this.state.answers}
            horizontal
            pagingEnabled
            onScrollEndDrag={this._onScrollEndDrag}
            onMomentumScrollEnd={this._onScrollMomentumEnd}
            getItemLayout={this._getItemLayout}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
          {this.props.showArrows &&
            <ArrowButton
              left
              disabled={this.state.currentIndex === 0}
              onPress={this._scrollLeft}
            />}
          {this.props.showArrows &&
            <ArrowButton
              right
              disabled={
                this.state.currentIndex === this.state.answers.length - 1
              }
              onPress={this._scrollRight}
            />}
        </View>
        {this.props.showDots &&
          <AnswerSwiperDots
            current={this.state.currentIndex}
            total={this.state.answers.length}
          />}
      </View>
    );
  }
}

const EndBuffer = () => <View style={{ width: BUFFER_WIDTH }} />;

const ArrowButton = ({ left, onPress, disabled }) =>
  <TouchableOpacity
    style={[s.arrowButtonContainer, left ? s.leftArrowPos : s.rightArrowPos]}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={s.arrowInnerContainer}>
      <Entypo
        name={left ? 'chevron-left' : 'chevron-right'}
        size={40}
        color={disabled ? 'lightgray' : colors.primaryBlue}
      />
    </View>
  </TouchableOpacity>;

const HORIZONTAL_INSET = 60;
const BUFFER_WIDTH = HORIZONTAL_INSET / 2;

const s = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  innerContainer: {
    flex: 1
  },
  list: {
    overflow: 'visible'
  },
  answerWrapper: {
    flex: 1
  },
  arrowButtonContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    top: 0,
    bottom: 0
  },
  leftArrowPos: {
    left: -5
  },
  rightArrowPos: {
    right: -5
  },
  arrowInnerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});
