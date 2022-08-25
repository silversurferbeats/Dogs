import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//importo el reducer 
import rootReducer from '../Reducer/Reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));