import { connect } from 'react-redux';

import { getQuiz, getCorrectState } from '../selectors';
import { selectAnswer, checkAnswer, nextQuestion } from '../actions';
import CauseAndEffectQuiz from '../components/CauseAndEffectQuiz';

const mapStateToProps = state => {
  return {
    quiz: getQuiz(state),
    correctState: getCorrectState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnswerSelect: answer => dispatch(selectAnswer(answer)),
    onConfirmAnswer: () => dispatch(checkAnswer())
  };
};

const CauseAndEffectQuizContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CauseAndEffectQuiz);

export default CauseAndEffectQuizContainer;
