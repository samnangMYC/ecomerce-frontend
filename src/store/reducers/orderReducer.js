const initialState = {
    adminOrder: null,
    pagination: {}
};


export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ADMIN_ORDERS":
            return {
                ...state,
                adminOrder: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageSize,
                    pageSize: action.totalElemnets,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action,
                }
            }
        default:
            return state;
    }
   
}
