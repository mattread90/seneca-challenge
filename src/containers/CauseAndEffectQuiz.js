import { connect } from 'react-redux';

import { getQuiz } from '../selectors';
import { selectAnswer, confirmAnswer, nextQuestion } from '../actions';
import CauseAndEffectQuiz from '../components/CauseAndEffectQuiz';

const mapStateToProps = state => {
  return {
    quiz: getQuiz(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnswerSelect: answer => {
      dispatch(selectAnswer(answer));
    },
    onConfirmAnswer: (answer, correctAnswer) => {
      if (answer === correctAnswer) {
        dispatch(nextQuestion());
      }
    }
  };
};

const CauseAndEffectQuizContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CauseAndEffectQuiz);

export default CauseAndEffectQuizContainer;
