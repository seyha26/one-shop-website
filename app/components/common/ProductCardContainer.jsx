"use client";
import { useState, useEffect, Suspense } from "react";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Widget from "./Widget";
import {
  getProductDetail,
  getProducts,
  getProductsByCategory,
} from "@/redux/features/actions";
import { Icon } from "@iconify/react";
import { SessionProvider, useSession } from "next-auth/react";
// import { useSession } from "next";
import productCategories from "@/categories/productCategories";
import { useRouter } from "next/navigation";
import { addToCart, getUserCart, getFav } from "@/redux/features/actions";
import CardProduct from "./CardProduct";
import Link from "next/link";
// import {useSession}
import toast, { Toaster } from "react-hot-toast";

export default function CartContainer() {
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
  // console.log(data);
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
    dispatch(getProducts());
  }, [dispatch, data]);

  const Toaster = () => toast("Hello World");
  // console.log(products);
  // (() => )();
  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <div>
            <Toaster />
          </div>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Grid
        container
        sx={{
          backgroundImage: "url('/assets/Home/homebg.jpg')",
          minHeight: "90vh",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          marginBottom: "45px",
        }}
      >
        <Grid
          item
          container
          display="flex"
          flexDirection="column"
          maxWidth="1300px"
          marginX="auto"
          marginY="40px"
          padding="10px"
        >
          <Grid item container spacing={1} sx={{ marginBottom: "100px" }}>
            <Grid item xs={3}>
              <Widget side="left" title="Past Deals Result" />
            </Grid>
            <Grid item xs={9}>
              <Widget side="right" title={`📢Winner Announcement`} />
            </Grid>
          </Grid>
          <Grid display={"flex"} justifyContent={"flex-end"} marginY={"30px"}>
            <Typography variant="h5">
              <Link href="/products" className="hover:underline">
                View All Products
              </Link>
            </Typography>
          </Grid>
          {productCategories.map(
            (category, index) =>
              index < 5 && (
                <Grid
                  key={category}
                  style={{
                    marginTop: "50px",
                    overflowX: "auto",
                    width: "100%",
                    gap: "1rem",
                    padding: "20px 10px",
                    margin: "auto",
                  }}
                >
                  <Grid
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Link href={`/categories/${category}`}>
                      <Typography
                        variant="h5"
                        className="cursor-pointer hover:underline font-medium text-slate-700"
                      >
                        {category.toUpperCase()}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid
                    style={{
                      marginTop: "20px",
                      overflowX: "auto",
                      width: "100%",
                      padding: "0 10px 40px",
                      display: "Grid",
                      gridTemplateColumns: "210px 210px 210px 210px 210px",
                      gap: "1rem",
                      justifyContent: "space-between",
                    }}
                  >
                    {products && (
                      <>
                        {products
                          .filter((p) => {
                            return p.category === category;
                          })
                          .map((item) => {
                            return (
                              <CardProduct
                                key={item._id}
                                item={item}
                                handleSelectItem={handleSelectItem}
                                // addToCarts={addToCarts}
                                itemId={itemId}
                                inCart={item.inCart}
                                inFav={item.inFav}
                              />
                            );
                          })}
                      </>
                    )}
                  </Grid>
                </Grid>
              )
          )}
        </Grid>
      </Grid>
    </Suspense>
  );
}
