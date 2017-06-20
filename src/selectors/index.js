export function getQuiz(state) {
  return state.quiz;
}

export function getSelectedAnswer(state) {
  return getQuiz(state).currentAnswer;
}

export function getCorrectAnswerForCurrentQuestion(state) {
  return getCurrentQuestion(state).correctAnswer;
}

export function getCurrentQuestion(state) {
  return getQuiz(state).questions[getQuiz(state).currentQuestion];
}

export function getCorrectState(state) {
  return state.ui.correctState;
}
