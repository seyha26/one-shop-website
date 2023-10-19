"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import {
  addToCart,
  getProductDetail,
  getProducts,
  getProductsByCategory,
} from "@/redux/features/actions";
import CardProduct from "@/app/components/common/CardProduct";
import Link from "next/link";
import { usePathname } from "next/navigation";
import productCategories from "@/categories/productCategories";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
const Products = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const handleSelectItem = (id) => {
    dispatch(getProductDetail(id));
    Router.push(`/details/${id}`);
  };
  // const addToCarts = () => {};
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Grid maxWidth={"1300px"} margin={"30px auto"} padding={"0 20px"}>
      <Grid>
        <Grid margin={"20px 0"}>
          <Stack>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="hover:underline" href="/">
                <Typography>Home</Typography>
              </Link>
              <Link href="/products">
                <Typography>All Products</Typography>
              </Link>
            </Breadcrumbs>
          </Stack>
          <Grid margin={"20px 0"}>
            <Typography variant="h5">All Products</Typography>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "Grid",
            gridTemplateColumns: "220px 220px 220px 220px 220px",
            gridGap: "30px 10px",
            justifyContent: "space-around",
          }}
        >
          {products.map((item) => (
            <CardProduct
              key={item.id}
              inCart={item.inCart}
              inFav={item.inFav}
              item={item}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
