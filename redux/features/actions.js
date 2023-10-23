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
    const res = await fetch("/api/get-products")
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));

    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = (data) => async (dispatch) => {
  try {
    // console.log(`http://localhost:3000/api/detail/${data}`);
    const res = await fetch(`/api/detail/${data}`, {
      method: "POST",
      body: JSON.stringify({
        _id: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // if (res.status !== 200) {
        //   return;
        // }
        // console.log("res");
        return res.json();
      })
      .catch((error) => console.log(error));
    dispatch({
      type: "GET_PRODUCTS_DETAIL",
      payload: res,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (data) => async (dispatch) => {
  try {
    console.log("data", data);
    const res = await fetch(`/api/add-to-cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: data.productId,
        userId: data.userId,
        qty: data.qty,
        price: data.price * data.qty,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    console.log(res);
    dispatch({
      type: "ADD_TO_CART",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToFav = (data) => async (dispatch) => {
  try {
    console.log("data: ", data);
    const res = await fetch(`/api/favorite/${data.userId}`, {
      method: "POST",
      body: JSON.stringify({
        userId: data.userId,
        productId: data.productId,
        inFav: data.inFav,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));
    dispatch({ type: "ADD_FAV", payload: { res, data } });
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = (data) => async (dispatch) => {
  try {
    if (data) {
      const res = await fetch(`/api/cart/${data}`)
        .then((res) => {
          // if (res.status !== 200) {
          //   return;
          // }
          return res.json();
        })

        .catch((error) => console.log(error));
      // console.log(res);

      dispatch({ type: "GET_USER_CART", payload: res });
    }
    // return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = (data) => async (dispatch) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${data}`)
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        return res.json();
      })
      .catch((error) => console.log(error));
    dispatch({
      type: "GET_PRODUCTS_BY_CATEGORY",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = (data) => async (dispatch) => {
  try {
    const res = await fetch("/api/remove-from-cart", {
      method: "POST",
      body: JSON.stringify({
        productId: data._id,
        userId: data.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: { res, data },
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

export const getFav = (data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/get-favorite/${data.userId}`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));
    dispatch({
      type: "GET_FAV",
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProduct = (data) => async (dispatch) => {
  try {
    const res = await fetch("/api/get-products")
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));

    dispatch({
      type: "SEARCH_PRODUCT",
      payload: { data, res },
    });
  } catch (error) {
    console.log(error);
  }
};
