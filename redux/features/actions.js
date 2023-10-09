export const userLogin = (data, callback) => async (dispatch) => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status !== 200) {
        return;
      } else {
        return res.json();
      }
    });
    dispatch({
      type: "USER_LOGIN",
      payload: res,
    });
    return callback(res);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=200").then(
      (res) => {
        if (res.status !== 200) {
          return;
        }
        return res.json();
      }
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = (data, callback) => async (dispatch) => {
  try {
    const res = await fetch(`https://dummyjson.com/product/${data}`).then(
      (res) => {
        if (res.status !== 200) {
          return;
        }
        return res.json();
      }
    );
    dispatch({
      type: "GET_PRODUCTS_DETAIL",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (data, callback) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_TO_CART",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = (data, callback) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${data}`
    ).then((res) => {
      if (res.status !== 200) {
        return;
      }
      return res.json();
    });
    dispatch({
      type: "GET_PRODUCTS_BY_CATEGORY",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = (id) => (dispatch) => {
  try {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const incrementQuntity = (id) => (dispatch) => {
  try {
    dispatch({
      type: "INCREMENT",
      payload: id,
    });
  } catch (error) {}
};

export const decrementQuntity = (id) => (dispatch) => {
  try {
    dispatch({
      type: "DECREMENT",
      payload: id,
    });
  } catch (error) {}
};
