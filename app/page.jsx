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
import Widget from "./components/common/Widget";
import {
  getProductDetail,
  getProducts,
  getProductsByCategory,
} from "@/redux/features/actions";
import { Icon } from "@iconify/react";
import { SessionProvider, useSession } from "next-auth/react";
import productCategories from "@/categories/productCategories";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/features/actions";
import CardProduct from "./components/common/CardProduct";
import Link from "next/link";
import Loading from "./loading";

export default function Home() {
  const [itemId, setItemId] = useState("");
  const { data } = useSession();
  const dispatch = useDispatch();
  const Router = useRouter();

  const products = useSelector((state) => {
    return state.products.products;
  });

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

  // const sendData = async () => {
  //   // dispatch(getProducts());
  //   await fetch("http://localhost:5000", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(useSelector((state) => state.products)),
  //   })
  //     .then((res) => console.log(res.json()))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
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
          <Grid item container spacing={1} marginBottom="100px">
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
                    <Typography
                      variant="h5"
                      className="cursor-pointer hover:underline font-medium text-slate-700"
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid
                    style={{
                      marginTop: "20px",
                      overflowX: "auto",
                      width: "100%",
                      padding: "0 10px 40px",
                      display: "Grid",
                      gridTemplateColumns: "auto auto auto auto auto",
                      gap: "1rem",
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
                                key={item.id}
                                item={item}
                                handleSelectItem={handleSelectItem}
                                addToCarts={addToCarts}
                                itemId={itemId}
                                inCart={item.inCart}
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
