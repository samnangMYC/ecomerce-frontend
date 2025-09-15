import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch data",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });

    const { data } = await api.get(
      `/public/categories?pageNumber=0&pageSize=10`
    );
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch categories data",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    // find product
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId == data.productId
    );

    // check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    // if inStock add
    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });

      toast.success(`${data?.productName} added to cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

      // not show error
    } else {
      toast.success(`${data?.productName} out of stock`);
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    // Find the product
    const { products } = getState().products || [];

    console.log(products);

    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);

      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity + 0 },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached to Limit");
    }
  };
export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`${data.productName} remove from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};


export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Loggin is successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Internal Server Error!!");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User account register successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error!!"
      );
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress = (sendData, toast,setLoader, addressId, setIsOpen) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;
      await api.post(`/addresses`, sendData, {
        headers: { Authorization: "Bearer " + user.jwtToken },
      });

      dispatch({ type: "BUTTON_LOADER" });
      try {
        if (!addressId) {
          const { data } = await api.post("/addresses", sendData);
        } else {
          await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type: "IS_SUCCESS" });
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type: "IS_ERROR", payload: null });
      }
    } finally {
      setLoader(false);
      setIsOpen(false);
    }
  };
};

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/users/addresses`);
    dispatch({
      type: "USER_ADDRESS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectedUserCheckOutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  return {
    type: "SELECTED_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const clearCheckOutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });

      await api.delete(`/addresses/${addressId}`);

      dispatch({ type: "IS_SUCCESS" });
      dispatch(clearCheckOutAddress());

      toast.success("Address delete succesfully");

      dispatch(getUserAddresses());
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Failed to delete user addresses",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};
export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  console.log(sendCartItems);
  try {
    console.log(sendCartItems);
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    console.log(response.data);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/users/cart");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items",
    });
  }
};

export const createStripePaymentSecret =
  (totalPrice) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.post("/order/stripe-client-secret", {
        amount: Number(totalPrice) * 100,
        currency: "usd",
      });
      dispatch({ type: "CLIENT_SECRET", payload: data });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Failed to create client secret",
      });
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      setLoading(true);

      const res = await api.post("/order/users/payments/online", sendData);
      console.log(res);

      if (res.data) {
        console.log("INSIDE RES");
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted");
      } else {
        setErrorMessage("Payment Failed. Please try again!!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Payment Failed!!",
      });
    } finally {
      setLoading(false);
    }
  };

export const analyticsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/analytics");

    dispatch({ type: "FETCH_ANALYTICS", payload: data });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Error fetching analytics",
    });
  }
};

export const getOrdersForDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/admin/orders?${queryString}`);
    dispatch({
      type: "GET_ADMIN_ORDERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch orders data",
    });
  }
};

export const updateOrderStatusFromDashboard = (
  orderId,
  orderStatus,
  toast,
  setLoader
) => {
  return async (dispatch, getState) => {
    try {
      setLoader(true);

      dispatch({ type: "BUTTON_LOADER" });

      const { data } = await api.put(`admin/order/${orderId}/status`, {
        status: orderStatus,
      });

      dispatch(getUserAddresses());
      toast.success("Order update successfully");

      await dispatch(getOrdersForDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };
};

export const dashboardProductsAction = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/admin/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch dashboard product",
    });
  }
};

export const updateProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(`/admin/products/${sendData.id}`, sendData);
      toast.success("Product update successful");
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardProductsAction());
      reset();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.description || "Failed to update product"
      );
    }
  };

export const addNewProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.post(
        `/admin/categories/${sendData.categoryId}/product`,
        sendData
      );
      toast.success("Product created successfully");
      reset();
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Product creation failed");
    }
  };

export const deleteProduct =
  (toast, productId, setLoader, setOpenDeleteModal) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);

      await api.delete(`/admin/products/${productId}`);
      toast.success("Product delete succesfully");
      setLoader(false);
      setOpenDeleteModal(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      //  console.log(error);
      toast.error(error?.response?.data?.message || "Error Occurred!");
    }
  };

export const updateProductImageFromDashboard =
  (formData, productId, toast, setLoader, setOpen) => async (dispatch) => {
    try {
      if (setLoader) setLoader(true);

      await api.put(`/admin/products/${productId}/image`, formData);

      toast.success("Image updated successfully");

      if (setLoader) setLoader(false);
      if (setOpen) setOpen(false);

      await dispatch(dashboardProductsAction());
    } catch (error) {
      if (setLoader) setLoader(false);
      console.log(error);
      toast.error(
        error?.response?.data?.description || "Failed to update product image"
      );
    }
  };

export const getCategoriesFromDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch orders data",
    });
  }
};
export const updateCategoryFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(`/admin/categories`, sendData);
      toast.success("Category update successfully");
      setOpen(false);
      await dispatch(getCategoriesFromDashboard());
      reset();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.description || "Failed to update category"
      );
    } finally {
      setLoader(false);
    }
  };

export const deleteCategory =
  (toast, categoryId, setLoader, setOpenDeleteModal) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);

      await api.delete(`/admin/categories/${categoryId}`);
      toast.success("Category delete succesfully");

      setOpenDeleteModal(false);
      await dispatch(getCategoriesFromDashboard());
    } catch (error) {
      //  console.log(error);
      toast.error(error?.response?.data?.message || "Error Occurred!");
    } finally {
      setLoader(false);
    }
  };
export const addNewCategoryFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.post(
        `/admin/categories`,
        sendData
      );
      toast.success("Category created successfully");
      reset();
      setOpen(false);
      await dispatch(getCategoriesFromDashboard());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Category creation failed");
    } finally {
      setLoader(false);
    }
  };

  export const getSellerFromDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/auth/sellers?${queryString}`);
    dispatch({
      type: "FETCH_SELLER",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch sellers data",
    });
  }
};