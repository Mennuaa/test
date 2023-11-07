import todoReducers from './Reducers';
import {combineReducers} from 'redux';
import hostelReducer from './HostelReducer';
import roomReducer from './RoomReducer';
import EmployeesInWorkReducer from './EmployeesInWorkReducer';
import RoomsCReducer from './setRoomsCDataReducer';
import RoomsCapacityReducer from './setRoomsCapacityDataReducer';
import TovarnaReducer from './TovarnaReducer';

const rootReducers = combineReducers({
	todoReducers,
	hostel: hostelReducer,
	room: roomReducer,
	numberOfEmployees: EmployeesInWorkReducer,
	Rooms: RoomsCReducer,
	RoomsCapacity: RoomsCapacityReducer,
	tovarna: TovarnaReducer,

})

export default rootReducers;