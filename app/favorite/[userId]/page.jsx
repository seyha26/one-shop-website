"use client";
import React, { useState, useEffect } from "react";
import CardProduct from "@/app/components/common/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import {
  getProductDetail,
  getProducts,
  getProductsByCategory,
  getFav,
} from "@/redux/features/actions";
import { Icon } from "@iconify/react";
import { SessionProvider, useSession } from "next-auth/react";
// import { useSession } from "next";
import productCategories from "@/categories/productCategories";
import { useRouter } from "next/navigation";
import { addToCart, getUserCart } from "@/redux/features/actions";
import Link from "next/link";
// import {useSession}
import toast, { Toaster } from "react-hot-toast";

export default function Favorite() {
  const favProduct = useSelector((state) => state.products.favorite);

  const [itemId, setItemId] = useState("");
  // const [products, setProducts] = useState([]);
  const { data } = useSession();

  const dispatch = useDispatch();
  const Router = useRouter();

  const products = useSelector((state) => {
    return state.products.products;
  });

  // console.log(products);

  const addToCarts = (id, name, price, amount, image, total) => {
    dispatch(addToCart({ id, name, price, amount, image, total }));
  };
  const handleSelectItem = (id) => {
    dispatch(getProductDetail(id));

    Router.push(`/details/${id}`);
  };

  const handleSelectCategory = (category) => {
    dispatch(getProductsByCategory(category));
    Router.push(`/category/${category}`);
  };
  // console.log(favProduct);
  const fetchData = () => {
    if (data?.user?._id) {
      dispatch(getUserCart(data?.user?._id));
    }
  };
  fetchData();

  useEffect(() => {
    if (data?.user) {
      dispatch(getFav({ userId: data?.user?._id }));
    }
  }, [dispatch, data]);
  // console.log(favProduct);
  return (
    <Grid
      sx={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "0 40px",
      }}
    >
      <Typography variant="h5" margin="20px 0">
        Favorite
      </Typography>
      <Grid
        sx={{
          display: "Grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gap: "1rem",
        }}
      >
        {favProduct.map((product) => (
          <CardProduct
            key={product._id}
            item={product.productId}
            handleSelectItem={handleSelectItem}
            addToCarts={addToCarts}
            itemId={itemId}
            // inCart={product.inCart}
          />
        ))}
      </Grid>
    </Grid>
  );
}
