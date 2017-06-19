import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class AnswerSwiper extends React.Component {
  static propTypes = {
    renderAnswer: PropTypes.func.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  _transformAnswers = answers => {
    console.log('updating answers in AnswerSwiper');
    return answers.reduce((answers, answer) => {
      answers.push({ key: answer, text: answer });
      return answers;
    }, []);
  };

  constructor(props) {
    super();
    console.log(Dimensions.get('window'));
    this.state = {
      answers: this._transformAnswers(props.answers),
      screenWidth: Dimensions.get('window').width
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      answers: this._transformAnswers(nextProps.answers)
    });
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={[s.answerWrapper, { width: this.state.screenWidth - 60 }]}>
        {this.props.renderAnswer(item)}
      </View>
    );
  };

  _onScrollEndDrag = e => {
    // This stops user scrolling past the last item
    if (
      e.nativeEvent.contentOffset.x >
      30 + (this.state.screenWidth - 60) * (this.state.answers.length - 1)
    ) {
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

  _listRef = ref => (this._list = ref);

  render() {
    return (
      <FlatList
        ref={this._listRef}
        style={[s.container, { width: this.state.screenWidth - 60 }]}
        ListHeaderComponent={EndBuffer}
        renderItem={this._renderItem}
        data={this.state.answers}
        horizontal
        pagingEnabled
        onScrollEndDrag={this._onScrollEndDrag}
        getItemLayout={this._getItemLayout}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const EndBuffer = () => <View style={{ width: 30 }} />;

const s = StyleSheet.create({
  container: {
    overflow: 'visible'
  },
  answerWrapper: {
    flex: 1
  }
});
