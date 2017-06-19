import { createStore } from 'redux';
import quiz from './reducers/quiz';

const store = createStore(quiz);

export default store;
