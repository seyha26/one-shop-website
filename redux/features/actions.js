import { headers } from "@/next.config";

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
    const res = await fetch("http://localhost:3000/api/get-products")
      .then((res) => {
        // if (res.status !== 200) {
        //   console.log("erorr");
        //   return;
        // }
        // console.log(res.json());
        return res.json();
      })
      .catch((err) => console.log(err));
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
    // console.log("res", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = (data, callback) => async (dispatch) => {
  try {
    // console.log(`http://localhost:3000/api/detail/${data}`);
    const res = await fetch(`http://localhost:3000/api/detail/${data}`, {
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

export const addToCart = (data, callback) => async (dispatch) => {
  try {
    // console.log("data", data);
    const res = await fetch(`http://localhost:3000/api/add-to-cart`, {
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

export const addToFav = (data, callback) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/favorite/${data.userId}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: data.userId,
          productId: data.productId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));
    console.log(res);
    dispatch({ type: "ADD_FAV", payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = (data, callback) => async (dispatch) => {
  try {
    if (data) {
      const res = await fetch(`http://localhost:3000/api/cart/${data}`)
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

export const getProductsByCategory = (data, callback) => async (dispatch) => {
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
    const res = await fetch("http://localhost:3000/api/remove-from-cart", {
      method: "POST",
      body: JSON.stringify({
        productId: data.productId,
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
    console.log(res);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: res,
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

export const getFav = (data, calback) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/get-favorite/${data.userId}`
    )
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
