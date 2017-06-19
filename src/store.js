import { createStore, combineReducers } from 'redux';

import quiz from './reducers/quiz';
import { initQuiz } from './actions';
import questions from '../questions';

const store = createStore(combineReducers({ quiz }));

store.dispatch(initQuiz(questions));

export default store;
