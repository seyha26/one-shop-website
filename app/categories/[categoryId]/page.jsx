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
  const [categories, setCategories] = useState("Smartphone");
  const dispatch = useDispatch();
  const handleSelectCategory = (cate) => {
    dispatch(getProductsByCategory(cate));
  };

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);
  const pathname = usePathname();
  const category = pathname.replace("/categories/", "");
  const data = useSelector((state) => state.products.products);
  return (
    <Grid maxWidth={"1300px"} marginX={"auto"} padding={"0 20px"}>
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
            <Typography>{categories}</Typography>
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
            {productCategories.map((cate) => (
              <h1
                key={cate}
                style={{
                  textTransform: "uppercase",
                  color: category === cate && "red",
                  cursor: "pointer",
                }}
                onClick={() => setCategories(cate)}
              >
                <Link href={`/categories/${cate}`}>{cate}</Link>
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
              gridTemplateColumns: "220px 220px 220px 220px",
              padding: "30px 0",
              gridGap: "2rem 1rem",
            }}
          >
            {data.map(
              (item) =>
                item.category === category && (
                  <CardProduct
                    key={item._id}
                    inCart={item.inCart}
                    inFav={item.inFav}
                    item={item}
                  />
                )
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Category;
