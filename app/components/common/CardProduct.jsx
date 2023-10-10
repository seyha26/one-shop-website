"use client";
import { Icon } from "@iconify/react";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getProductDetail,
  getProducts,
} from "@/redux/features/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const CardProduct = ({ item, itemId, inCart }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { data } = useSession();
  const userId = data?.user?._id;
  const user = useSelector((state) => state.auth);
  const success = () => toast.success("Successfully added to Cart!");
  console.log("item: ", item);
  const addToCarts = (productId, price, qty, stock, total) => {
    dispatch(addToCart({ productId, price, qty, stock, userId, total }));
    success();
    clicked();
  };
  const handleSelectItem = (id) => {
    dispatch(getProductDetail(id));
    Router.push(`/detail/${id}`);
  };
  const clicked = () => {
    dispatch(getProducts());
  };
  const addToFav = () => {
    if (!user.token) {
      Router.push("/login");
      return;
    }
  };
  // useEffect(() => {
  //   dispatch();
  // });
  return (
    <Grid
      className="shadow-xl"
      style={{
        maxWidth: "255px",
        height: "370px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        borderRadius: "5px",
        justifyContent: "space-around",
        border: "1px solid #F1EFEF",
      }}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <CardHeader
          titleTypographyProps={{ variant: "body2" }}
          title={item.name}
        />
        <Grid
          width={"200px"}
          height="170px"
          display="flex"
          alignItems={"center"}
        >
          {/* <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "170px",
            }}
            image={item.imageUrl}
            alt={`${item.name}`}
          /> */}
          <img width={"100%"} src={item.imageUrl} alt={item.name} />
        </Grid>
        <CardContent>
          <Typography>Price: {item.price}$</Typography>
        </CardContent>
      </Grid>
      <Grid display={"flex"} alignItems={"center"} gap={1}>
        <IconButton
          sx={{
            "&.MuiIconButton-root": {
              background: "rgb(255, 220, 204)",
            },
          }}
          onClick={() => addToFav()}
        >
          <Icon
            icon="material-symbols:favorite"
            style={{
              color: "#fff",
              width: "15px",
              height: "15px",
            }}
          />
        </IconButton>
        <Button
          onClick={() => handleSelectItem(item._id)}
          variant="contained"
          size="sm"
          sx={{
            "&.MuiButton-contained": {
              background: "#F26522",
              fontSize: "0.7rem",
            },
          }}
        >
          Enroll Now
        </Button>
        <IconButton
          sx={{
            "&.MuiIconButton-root": {
              background: "rgb(255, 220, 204)",
            },
          }}
          onClick={() =>
            addToCarts(
              item._id,

              item.price,
              !item.amount ? 1 : item.amount,
              !item.qty ? item.price * 1 : item.price * item.qty
            )
          }
        >
          <Icon
            icon="mdi:cart"
            style={{
              color: inCart ? "rgb(242, 101, 34)" : "#fff",
              width: "15px",
              height: "15px",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CardProduct;
