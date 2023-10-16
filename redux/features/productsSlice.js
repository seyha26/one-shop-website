const initialState = {
  products: [],
  productsByCategory: [],
  selectedProduct: {},
  cart: {
    id: "",
    name: "",
    price: "",
    amount: "",
    total: "",
    image: "",
    inCart: false,
  },
  totalprice: "",
  totalItems: "",
  ordered: [],
  favorite: [],
  inFav: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      // const newProducts = action.payload.products.map((product) => {
      //   state.ordered.map((item) => {
      //     return product.title === item.name
      //       ? (product = { ...product, inCart: true })
      //       : product;
      //   });
      //   return product;
      // });
      console.log("Get product: ", state.favorite, action.payload);
      const products = action.payload.map((pro) => {
        console.log(pro);
        state.favorite.map((fav) => {
          console.log(fav);
          return fav.productId._id === pro._id
            ? (pro = { ...pro, inFav: true })
            : pro;
        });
        state.ordered.map((item) => {
          return item.productId._id === pro._id
            ? (pro = { ...pro, inCart: true })
            : pro;
        });
        return pro;
      });
      console.log(products);
      return {
        ...state,
        products: products,
      };
    case "GET_PRODUCTS_DETAIL":
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case "GET_USER_CART":
      if (action.payload) {
        return {
          ...state,
          ordered: action.payload.cart.items,
          totalprice: action.payload.cart.totalPrice,
          totalItems: action.payload.cart.totalItems,
        };
      }

      return state;
    case "ADD_TO_CART":
      // state = {
      //   ...state,
      //   cart: {
      //     id: action.payload.id,
      //     name: action.payload.name,
      //     price: action.payload.price,
      //     amount: action.payload.amount,
      //     total: action.payload.price * action.payload.amount,
      //     image: action.payload.image,
      //     inCart: true,
      //   },
      // };
      // const newOrdered = state.ordered.map((item) => {
      //   return item.id === action.payload.id
      //     ? {
      //         ...item,
      //         amount: item.amount + action.payload.amount,
      //         total: item.amount * item.price,
      //       }
      //     : item;
      // });
      // const productIndex = state.ordered.findIndex(
      //   (product) => product.id === action.payload.id
      // );

      // if (productIndex !== -1) {
      //   //   const newAmount = (state.ordered[productIndex].amount +=
      //   //     action.payload.amount);
      //   //   const newTotal = state.ordered[productIndex].amount;
      //   //   state.ordered[productIndex].price * state.ordered[productIndex].amount;
      //   return { ...state, ordered: newOrdered };
      // } else {
      //   return { ...state, ordered: [...state.ordered, state.cart] };
      // }
      console.log("Add to cart: ", action);
      const newProducts = state.products.map((pro) => {
        action.payload.cart.items.map((item) => {
          console.log("item", item);
          return item.productId === pro._id
            ? (pro = { ...pro, inCart: true })
            : pro;
        });
        return pro;
      });
      console.log("New Product: ", newProducts);

      return {
        ...state,
        ordered: action.payload.cart.items,
        products: newProducts,
      };
    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload.products,
      };
    case "REMOVE_PRODUCT": {
      console.log(action);
      const newProducts = state.products.map((pro) => {
        console.log(
          "item",
          pro._id == action.payload.data.productId._id,
          pro,
          action.payload.data
        );
        // action.payload.res.cart.items.map((item) => {
        return pro._id === action.payload.data.productId._id
          ? (pro = { ...pro, inCart: false })
          : pro;
        // });
        // return pro;
      });
      console.log("New Product: ", action.payload.res);
      // const newCartItem = action.payload.cart.items;
      // const newProduct = state.products.map((product) => {
      //   newCartItem.map((item, index) => {
      //     // console.log(
      //     //   "Items and products",
      //     //   item.productId._id,
      //     //   "Product: ",
      //     //   products._id
      //     // );
      //     console.log(index, "Item", item.productId._id !== product._id);
      //     return item.productId._id === product._id
      //       ? (product = { ...product, inCart: true })
      //       : product;
      //   });
      //   return product;
      // });
      // console.log(newCartItem);
      return {
        ...state,
        products: newProducts,
        ordered: action.payload.res.cart.items,
        totalprice: action.payload.res.cart.totalPrice,
        totalItems: action.payload.res.cart.totalItems,
      };
    }
    case "INCREMENT": {
      const newOrdered = state.ordered.map((item) => {
        return item.id === action.payload
          ? {
              ...item,
              amount: (item.amount += 1),
              total: item.amount * item.price,
            }
          : item;
      });
      return {
        ...state,
        ordered: newOrdered,
      };
    }
    case "DECREMENT": {
      const decrementQuntity = state.ordered.map((item) => {
        return item.id === action.payload && item.amount > 0
          ? {
              ...item,
              amount: (item.amount -= 1),
              total: item.amount * item.price,
            }
          : item;
      });
      const newOrdered = decrementQuntity.filter((item) => item.amount !== 0);
      return {
        ...state,
        ordered: newOrdered,
      };
    }
    case "ADD_FAV": {
      return { ...state, favorite: action.payload.favorite.items };
    }
    case "GET_FAV": {
      return { ...state, favorite: action.payload.favorite.items };
    }
    default:
      return state;
  }
}
