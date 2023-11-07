const initialState = {
    emplInWorkData: null,
  };
  
  const EmployeesInWorkReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EMPLINWORK_DATA':
        return {
          ...state,
          emplInWorkData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default EmployeesInWorkReducer;