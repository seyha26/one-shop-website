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
      // console.log(action);
      return {
        ...state,
        products: action.payload,
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
      return { ...state, ordered: action.payload.cart.items };
    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload.products,
      };
    case "REMOVE_PRODUCT": {
      // const newProducts = state.products.map((product) => {
      //   return product.id === action.payload
      //     ? (product = { ...product, inCart: false })
      //     : product;
      // });
      // const newOrdered = state.ordered.filter(
      //   (item) => item.id !== action.payload
      // );
      // return { ...state, products: newProducts, ordered: action.payload.cart.items };
      return {
        ...state,
        ordered: action.payload.cart.items,
        totalprice: action.payload.cart.totalPrice,
        totalItems: action.payload.cart.totalItems,
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
