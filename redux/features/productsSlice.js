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
      // console.log(action);
      const products = action.payload.map((pro) => {
        state.ordered.map((item) => {
          return item.productId._id === pro._id
            ? (pro = { ...pro, inCart: true })
            : pro;
        });
        return pro;
      });

      const newProductsList = products.map((product) => {
        state.favorite.map((item) => {
          return item.productId._id === product._id
            ? (product = {
                ...product,
                inFav: true,
              })
            : product;
        });
        return product;
      });
      return {
        ...state,
        products: newProductsList,
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
      const newProducts = state.products.map((pro) => {
        action.payload.cart.items.map((item) => {
          return item.productId._id === pro._id
            ? (pro = { ...pro, inCart: true })
            : pro;
        });
        return pro;
      });
      const newFavorite = state.favorite.map((product) => {
        action.payload.cart.items.map((item) => {
          return item.productId._id === product.productId._id
            ? (product = { ...product, inCart: true })
            : product;
        });
        return product;
      });
      return {
        ...state,
        ordered: action.payload.cart.items,
        products: newProducts,
        favorite: newFavorite,
        totalprice: action.payload.cart.totalPrice,
        totalItems: action.payload.cart.totalItems,
      };
    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload.products,
      };
    case "REMOVE_PRODUCT": {
      const newProducts = state.products.map((pro) => {
        return pro._id === action.payload.data.productId._id
          ? (pro = { ...pro, inCart: false })
          : pro;
      });
      const newFavorite = state.favorite.map((product) => {
        return product.productId._id === action.payload.data.productId._id
          ? (product = { ...product, inCart: false })
          : product;
      });
      return {
        ...state,
        favorite: newFavorite,
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
      const newProduct = state.products.map((product) => {
        return product._id === action.payload.data.productId
          ? (product = { ...product, inFav: action.payload.data.inFav })
          : product;
      });
      const newFavorite = action.payload.res.favorite.items.map((product) => {
        product = { ...product, inFav: true };
        return product;
      });
      return {
        ...state,
        products: newProduct,
        favorite: newFavorite,
      };
    }
    case "GET_FAV": {
      const newProduct = action.payload.favorite.items.map((product) => {
        state.ordered.map((item) => {
          return item.productId._id == product.productId._id
            ? (product = { ...product, inFav: true, inCart: true })
            : (product = { ...product, inFav: true });
        });
        return product;
      });
      return { ...state, favorite: newProduct };
      // return state;
    }
    case "SEARCH_PRODUCT": {
      const newProduct = action.payload.res.filter((product) => {
        console.log(product);
        return product.name.toLowerCase().includes(action.payload.data);
      });
      console.log(action);
      console.log(newProduct);
      return { ...state, products: newProduct };
    }
    default:
      return state;
  }
}
