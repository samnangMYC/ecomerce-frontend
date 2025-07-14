const initialState = {
  isLoading: false,
  errorMessage: null,
  categoryLoader: false,
  categoryError: null,
  btnLoader: false,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };

    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        categoryLoader: false,
        btnLoader: false,
      };
    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryError: null,
        categoryLoader: true,
        errorMessage: null,
      };
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        errorMessage: null,
        categoryError: null,
        btnLoader: false,
        categoryLoader: false,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        categoryLoader: false,
        errorMessage: null,
        categoryError: action.payload,
      };
    case "BUTTON_LOADER":
      return {
        ...state,
        btnLoader: true,
        errorMessage: null,
        categoryError: null,
      };

    default:
      return state;
  }
};
