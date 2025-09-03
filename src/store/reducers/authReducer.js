const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckOutAddress: null,
  seller: [],
  pagination: {}
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

    case "FETCH_SELLER":
      return {
        ...state,
        seller: action.payload,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage
        }
      };

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
