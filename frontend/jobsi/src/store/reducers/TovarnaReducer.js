const initialState = {
    tovarnaData: null,
  };
  
  const tovarnaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOVARNA_DATA':
        return {
          ...state,
          tovarnaData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tovarnaReducer;
  