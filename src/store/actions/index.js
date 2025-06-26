import api  from "../../api/api"


export const fetchProducts = (queryString) => async (dispatch) => {
 
   try {
        dispatch({ type: "IS_FETCHING"});

        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({ type: "IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",payload: error?.response?.data?.message || "Failed to fetch data"});
        
    }
}

export const fetchCategories = () => async (dispatch) => {
 
   try {
        dispatch({ type: "CATEGORY_LOADER"});

        const { data } = await api.get(`/public/categories?pageNumber=0&pageSize=10`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({ type: "CATEGORY_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({ type: "IS_ERROR",payload: error?.response?.data?.message || "Failed to fetch categories data"});
        
    }
}

export const addToCart = (data,qty = 1,toast) =>
    (dispatch, getState) => {

        // find product
        const { products } = getState().products;
        const getProduct = products.find((item) =>
            item.productId == data.productId
        );

        // check for stocks
        const isQuantityExist = getProduct.quantity >= qty;

        // if inStock add 
        if(isQuantityExist){
            dispatch({type: "ADD_CART", payload: {...data,quantity: qty}});
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
            
        } else {
            toast.success(`${data?.productName} out of stock`);
        }

        // not show error
}