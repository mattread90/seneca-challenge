export const INIT_QUIZ = 'INIT_QUIZ';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const CONFIRM_ANSWER = 'CONFIRM_ANSWER';

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

export function confirmAnswer() {
  return {
    type: CONFIRM_ANSWER
  };
}
