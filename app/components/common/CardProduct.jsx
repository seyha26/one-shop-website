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
import { useState } from "react";

const CardProduct = ({ item, itemId, inCart }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const user = useSelector((state) => state.auth);
  const addToCarts = (id, name, price, amount, image, total) => {
    dispatch(addToCart({ id, name, price, amount, image, total }));
    clicked();
  };
  const handleSelectItem = (id) => {
    dispatch(getProductDetail(id));
    Router.push(`/details/${id}`);
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
  return (
    <Grid
      className="shadow-xl"
      style={{
        maxWidth: "235px",
        height: "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        borderRadius: "5px",
        justifyContent: "space-around",
        border: "1px solid #F1EFEF",
      }}
    >
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <CardHeader
          titleTypographyProps={{ variant: "body" }}
          title={item.title.slice(0, 17)}
        />
        <CardMedia
          component="img"
          sx={{
            width: "170px",
            height: "170px",
          }}
          image={item.images[0]}
          alt={`${item.title}`}
        />

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
          onClick={() => handleSelectItem(item.id)}
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
              item.id,
              item.title,
              item.price,
              !item.amount ? 1 : item.amount,
              item.thumbnail,
              !item.amount ? item.price * 1 : item.price * item.amount
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
