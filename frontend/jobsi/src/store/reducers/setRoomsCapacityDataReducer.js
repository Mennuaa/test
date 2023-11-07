const initialState = {
    RoomsCapacityData: null,
  };
  
  const RoomsCapacityReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ROOMSCAPACITY_DATA':
        return {
          ...state,
          RoomsCapacityData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default RoomsCapacityReducer;
  