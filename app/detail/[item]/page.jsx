"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Button,
  IconButton,
  Stack,
  Divider,
  Rating,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/features/actions";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const Detail = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const amount = parseInt(value);
  const products = useSelector((state) => state.products.selectedProduct);
  const userId = data?.user?._id;
  // console.log(products);

  const decrement = () => {
    if (amount > 0) {
      setValue(amount - 1);
      setDisable(false);
    } else {
      return;
    }
  };

  const increment = () => {
    if (amount < products.stock) {
      setValue(amount + 1);
      if (amount === products.stock - 1) {
        setDisable(true);
      } else return;
    }
  };

  const addAmount = (add) => {
    if (add < products.stock) {
      setValue(add);
    } else if (add > products.stock) {
      setValue(products.stock);
    }
  };

  const addToCarts = (productId, price) => {
    dispatch(addToCart({ productId, price, userId, qty: amount }));
    success();
    router.push("/");
  };
  const success = () => toast.success("Successfully added to Cart!");
  return (
    <Grid maxWidth="1300px" margin="20px auto" paddingBottom={"300px"}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Grid margin={"30px 0"}>
        <Stack>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Typography>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </Typography>
            <Link href={`/categories/${products.category}`}>
              <Typography className="hover:underline">
                {products.category}
              </Typography>
            </Link>
            <Typography>{products.name}</Typography>
          </Breadcrumbs>
        </Stack>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid
            border={"1px solid gray"}
            borderRadius={"5px"}
            padding={"20px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"350px"}
            overflow={"hidden"}
          >
            <img src={products.imageUrl} width={"250px"} alt="" />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid>
            <Typography variant="h6">{products.name}</Typography>
            {/* <Typography className="my-1" sx={{ color: "gray" }}>
              {products.brand}
            </Typography> */}
            <Grid
              sx={{
                color: "#000",
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <Grid display={"flex"} gap={"1rem"}>
                <Typography style={{ color: "orange" }}>
                  {products.stock}
                </Typography>
                Available
              </Grid>
              <Grid style={{ display: "flex", gap: "1rem" }}>
                <Divider
                  orientation="vertical"
                  sx={{ height: "20px", width: "1px", background: "#000" }}
                />
                <Grid style={{ color: "green" }}> {products.rating} </Grid>
                <Rating
                  name="half-rating"
                  value={Math.floor(products.rating)}
                  readOnly
                />
                Rating
              </Grid>
            </Grid>
          </Grid>
          <Grid
            border={"1px solid #F26522"}
            sx={{ background: "#FFF4EF" }}
            marginTop={"20px"}
            borderRadius={"5px"}
          >
            <Grid padding="10px">
              <Typography
                variant="h5"
                fontWeight={"600"}
                sx={{ color: "#F26522" }}
              >
                Price ${products.price}
              </Typography>
              <Grid
                display={"flex"}
                width={"300px"}
                justifyContent={"space-between"}
                margin={"40px 0"}
              >
                <Typography>Slots</Typography>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  border="1px solid #DDDDDD"
                >
                  <Grid
                    height="100%"
                    borderRight="1px solid #DDDDDD"
                    padding={"0 10px"}
                    onClick={decrement}
                  >
                    <Icon
                      icon="fluent:subtract-24-regular"
                      style={{
                        height: "100%",
                      }}
                    />
                  </Grid>

                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                      width: "40px",
                      textAlign: "center",
                      outline: "none",
                    }}
                  />
                  <Grid
                    height="100%"
                    borderLeft="1px solid #DDDDDD"
                    padding={"0 10px"}
                    onClick={increment}
                    disabled={disable}
                  >
                    <Icon
                      icon="material-symbols:add"
                      style={{
                        height: "100%",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid display={"flex"} gap={1} margin={"20px 0"}>
                <Button
                  variant="contained"
                  sx={{
                    height: "20px",
                    "&.MuiButton-contained": {
                      background: value === 10 ? "#F26522" : "#fff",
                      color: value === 10 ? "#fff" : "#000",
                      border: "1px solid #dddddd",
                      boxShadow: "none",
                    },
                  }}
                  disabled={value === 10}
                  onClick={() => addAmount(10)}
                >
                  10
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "20px",
                    "&.MuiButton-contained": {
                      background: value === 20 ? "#F26522" : "#fff",
                      color: value === 20 ? "#fff" : "#000",
                      border: "1px solid #dddddd",
                      boxShadow: "none",
                    },
                  }}
                  disabled={value === 20}
                  onClick={() => addAmount(20)}
                >
                  20
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "20px",
                    "&.MuiButton-contained": {
                      background: value === 50 ? "#F26522" : "#fff",
                      color: value === 50 ? "#fff" : "#000",
                      border: "1px solid #dddddd",
                      boxShadow: "none",
                    },
                  }}
                  disabled={value === 50}
                  onClick={() => addAmount(50)}
                >
                  50
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "20px",
                    "&.MuiButton-contained": {
                      background: value === 100 ? "#F26522" : "#fff",
                      color: value === 100 ? "#fff" : "#000",
                      border: "1px solid #dddddd",
                      boxShadow: "none",
                    },
                  }}
                  disabled={value === 100}
                  onClick={() => addAmount(100)}
                >
                  100
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "20px",
                    "&.MuiButton-contained": {
                      background: value === 200 ? "#F26522" : "#fff",
                      color: value === 200 ? "#fff" : "#000",
                      border: "1px solid #dddddd",
                      boxShadow: "none",
                    },
                  }}
                  disabled={value === 200}
                  onClick={() => addAmount(200)}
                >
                  200
                </Button>
              </Grid>
              <Grid display={"flex"} gap={3}>
                <Button
                  variant="contained"
                  sx={{
                    "&.MuiButton-contained": {
                      background: "#F26522",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    addToCarts(products._id, products.price, amount);
                    router.push("/cart");
                  }}
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    "&.MuiButton-outlined": {
                      borderColor: "#F26522",
                      color: "#F26522",
                    },
                  }}
                  onClick={() =>
                    addToCarts(
                      products._id,
                      products.price,
                      amount,
                      products.thumbnail
                    )
                  }
                >
                  <Icon
                    icon="mdi:cart-outline"
                    style={{ color: "rgb(242, 101, 34)" }}
                  />
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    "&.MuiButton-outlined": {
                      borderColor: "#F26522",
                      color: "#F26522",
                    },
                  }}
                >
                  <Icon
                    icon="material-symbols:favorite"
                    style={{ color: "#fff", fontSize: "22px" }}
                  />
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid padding="20px">
          <Typography variant="h6">
            Product Specifications & Product Description
          </Typography>
          <Typography>{products.description}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Detail;
