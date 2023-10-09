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
  getProductsByCategory,
} from "@/redux/features/actions";
import CardProduct from "@/app/components/common/CardProduct";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import productCategories from "@/categories/productCategories";
import { Icon } from "@iconify/react";

const Category = () => {
  const dispatch = useDispatch();
  const handleSelectCategory = (cate) => {
    dispatch(getProductsByCategory(cate));
  };

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch]);
  const pathname = usePathname();
  const category = pathname.replace("/category/", "");
  const data = useSelector((state) => state.products.productsByCategory);
  return (
    <Grid maxWidth={"1300px"} marginX={"auto"}>
      <Grid margin={"20px 0"} zIndex={"999"}>
        <Stack>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="hover:underline" href="/">
              <Typography>Home</Typography>
            </Link>
            <Typography>Categories</Typography>
            <Typography>{category}</Typography>
          </Breadcrumbs>
        </Stack>
      </Grid>
      <Grid container spacing={"20px"} marginTop={"0x"} zIndex={"99"}>
        <Grid item xs={3}>
          <Grid display={"grid"} gap={2} marginBottom={"100px"}>
            <Typography
              variant="h5"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <Icon icon="ion:list" /> All Categories
            </Typography>
            {productCategories.map((cate, index) => (
              <h1
                key={cate}
                style={{
                  textTransform: "uppercase",
                  color: pathname === `/category/${cate}` && "red",
                }}
                onClick={() => handleSelectCategory(cate)}
              >
                <Link href={`/category/${cate}`}>{cate}</Link>
                <Divider />
              </h1>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid
            sx={{
              background: "#F1EFEF",
              padding: "10px 20px",
              borderRadius: "4px",
            }}
          >
            <Typography>Products</Typography>
          </Grid>
          <Grid
            style={{
              display: "Grid",
              gridTemplateColumns: "auto auto auto auto",
              padding: "30px 0",
              gridGap: "2rem 1rem",
            }}
          >
            {data.map((item) => (
              <CardProduct key={item.id} item={item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Category;
