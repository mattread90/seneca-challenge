import { combineReducers } from 'redux';

import quiz from './quiz';
import ui from './ui';

const rootReducer = combineReducers({ quiz, ui });

export default rootReducer;
