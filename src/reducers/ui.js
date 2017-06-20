import {
  SUBMIT_CORRECT_ANSWER,
  SUBMIT_WRONG_ANSWER,
  CLEAR_ANSWER_STATE,
  CORRECT_STATES
} from '../actions';

const initialState = {
  correctState: CORRECT_STATES.NONE
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_WRONG_ANSWER:
      return {
        ...state,
        correctState: CORRECT_STATES.INCORRECT
      };
    case SUBMIT_CORRECT_ANSWER:
      return {
        ...state,
        correctState: CORRECT_STATES.CORRECT
      };
    case CLEAR_ANSWER_STATE:
      return {
        ...state,
        correctState: CORRECT_STATES.NONE
      };
    default:
      return state;
  }
};
