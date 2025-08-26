const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckOutAddress: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };

    case "USER_ADDRESS":
      return { ...state, address: action.payload };

    case "SELECTED_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckOutAddress: action.payload };

    case "REMOVE_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckOutAddress: null };

    case "CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };
    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectedUserCheckoutAddress: null
      };
    case "LOG_OUT":
      return initialState;

    default:
      return state;
  }
};
