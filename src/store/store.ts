import { combineReducers, configureStore } from '@reduxjs/toolkit';

import questionReducer from './question_reducer';
import stateModal from './modal_reducer';
import statePlayer from './player_reducer';
import stateLoader from './loader_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    modal: stateModal,
    player: statePlayer,
    loader: stateLoader
})

export default configureStore({ reducer : rootReducer});