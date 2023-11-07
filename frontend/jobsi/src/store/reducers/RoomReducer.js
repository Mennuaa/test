const initialState = {
    roomData: null,
  };
  
  const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ROOM_DATA':
        return {
          ...state,
          roomData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default roomReducer;
  