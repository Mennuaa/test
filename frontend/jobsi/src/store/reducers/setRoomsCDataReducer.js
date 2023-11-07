const initialState = {
    RoomsCData: null,
  };
  
  const RoomsCReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ROOMSCAPACITY_DATA':
        return {
          ...state,
          RoomsCData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default RoomsCReducer;