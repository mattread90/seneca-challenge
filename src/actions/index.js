import sampleQuestions from '../../questions';

export const INIT_QUIZ = 'INIT_QUIZ';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const CONFIRM_ANSWER = 'CONFIRM_ANSWER';
export const SUBMIT_CORRECT_ANSWER = 'SUBMIT_CORRECT_ANSWER';
export const SUBMIT_WRONG_ANSWER = 'SUBMIT_WRONG_ANSWER';
export const CLEAR_ANSWER_STATE = 'CLEAR_ANSWER_STATE';

export const CORRECT_STATES = {
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  NONE: 'NONE'
};

import {
  getSelectedAnswer,
  getCorrectAnswerForCurrentQuestion,
  getCurrentQuestionIndex,
  getTotalQuestions
} from '../selectors';

export function initQuiz(questions) {
  return {
    type: INIT_QUIZ,
    payload: { questions }
  };
}

export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  };
}

export function selectAnswer(answer) {
  return {
    type: SELECT_ANSWER,
    payload: { answer }
  };
}

export function submitWrongAnswer() {
  return dispatch => {
    dispatch(wrongAnswer());
    setTimeout(() => dispatch(clearAnswerState()));
  };
}

export function submitCorrectAnswer() {
  return dispatch => {
    dispatch(correctAnswer());
    setTimeout(() => dispatch(clearAnswerState()));
  };
}

export function correctAnswer() {
  return {
    type: SUBMIT_CORRECT_ANSWER
  };
}

export function wrongAnswer() {
  return {
    type: SUBMIT_WRONG_ANSWER
  };
}

export function clearAnswerState() {
  return {
    type: CLEAR_ANSWER_STATE
  };
}

export function checkAnswer() {
  return (dispatch, getState) => {
    const state = getState();
    if (
      getSelectedAnswer(state) === getCorrectAnswerForCurrentQuestion(state)
    ) {
      dispatch(submitCorrectAnswer());
      if (getCurrentQuestionIndex(state) < getTotalQuestions(state) - 1) {
        dispatch(nextQuestion());
      } else {
        dispatch(initQuiz(sampleQuestions));
      }
    } else {
      dispatch(submitWrongAnswer());
    }
  };
}
