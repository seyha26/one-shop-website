"use client";
import React, { useState, useEffect } from "react";
import LoginNavbar from "./LoginNavbar";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import CardProduct from "./CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "@/redux/features/actions";

const Headers = () => {
  // const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState("");
  const pathname = usePathname();
  const { data } = useSession();
  const products = useSelector((state) => state.products.searchProducts);
  // console.log(status);
  useEffect(() => {
    dispatch(searchProduct(searchParams));
  }, [dispatch, searchParams]);
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <LoginNavbar />
      ) : (
        <>
          <Header data={data} />
          <LoginNavbar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          {searchParams && (
            <Grid
              width={"100%"}
              height={"100vh"}
              position={"sticky"}
              top={"75px"}
              sx={{
                zIndex: "1",
                background: "#fff",
                overflowY: "auto",
                paddingTop: "20px",
              }}
            >
              <Grid maxWidth={"1300px"} marginX={"auto"}>
                <Typography paddingX="40px" variant="h5">
                  Search Result
                </Typography>
              </Grid>
              <Grid
                maxWidth={"1000px"}
                marginX={"auto"}
                sx={{
                  display: "Grid",
                  gridTemplateColumns: "220px 220px 220px 220px",
                  justifyContent: "space-around",
                  gap: "1rem",
                  // padding: "10px 20px",
                  marginTop: "10px",
                  paddingBottom: "100px",
                  // background: "#fff",
                }}
              >
                {products.map((product) => (
                  <CardProduct
                    key={product._id}
                    item={product}
                    inCart={product.inCart}
                    inFav={product.inFav}
                  />
                ))}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Headers;
