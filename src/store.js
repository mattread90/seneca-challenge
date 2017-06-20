import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { initQuiz } from './actions';
import questions from '../questions';

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(initQuiz(questions));

export default store;
