import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer, {toggleMenu} from './reducers/PostsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers';
import hostelReducer from './reducers/HostelReducer';
import roomReducer from './reducers/RoomReducer';
import EmployeesInWorkReducer from './reducers/EmployeesInWorkReducer';
import RoomsCReducer from './reducers/setRoomsCDataReducer';
import RoomsCapacityReducer from './reducers/setRoomsCapacityDataReducer';
import TovarnaReducer from './reducers/TovarnaReducer';

const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    sideMenu: toggleMenu,
    posts: PostsReducer,
    auth: AuthReducer,
		todoReducers,
    hostel: hostelReducer,
    room: roomReducer,
    numberOfEmployees: EmployeesInWorkReducer,
    Rooms: RoomsCReducer,
	  RoomsCapacity: RoomsCapacityReducer,
    tovarna: TovarnaReducer,

	//form: reduxFormReducer,	
	
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
