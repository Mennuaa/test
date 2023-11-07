const initialState = {
    hostelData: null,
  };
  
  const hostelReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_HOSTEL_DATA':
        return {
          ...state,
          hostelData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default hostelReducer;
  