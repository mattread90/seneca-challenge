import { INIT_QUIZ, NEXT_QUESTION, SELECT_ANSWER } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_QUIZ: {
      return {
        questions: action.payload.questions,
        currentQuestion: 0,
        currentAnswer: null
      };
    }
    case NEXT_QUESTION: {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        currentAnswer: null
      };
    }
    case SELECT_ANSWER: {
      return {
        ...state,
        currentAnswer: action.payload.answer
      };
    }
    default:
      return state;
  }
};
