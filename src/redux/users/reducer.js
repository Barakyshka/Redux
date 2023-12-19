const initialState = {
  user: null,
  errors: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        errors: null
      };
    case 'SET_USER_ERRORS':
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case 'SET_USER_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;