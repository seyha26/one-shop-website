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
  addToFav,
  getFav,
  getUserCart,
} from "@/redux/features/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const CardProduct = ({ item, itemId, inFav, inCart }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { data } = useSession();
  const userId = data?.user?._id;
  const user = useSelector((state) => state.auth);
  const success = () => toast.success("Successfully added to Cart!");
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
  const addToFavorite = (productId) => {
    // if (!user.token) {
    //   Router.push("/login");
    //   return;
    // }
    dispatch(addToFav({ productId, userId }));
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
          width={"100px"}
          height="160px"
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
          <img style={{ width: "200px" }} src={item.imageUrl} alt={item.name} />
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
          onClick={() => {
            dispatch(addToFav({ productId: item._id, userId, inFav: !inFav }));
          }}
        >
          <Icon
            icon="material-symbols:favorite"
            style={{
              color: inFav ? "rgb(242, 101, 34)" : "#fff",
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
          onClick={
            () => {
              dispatch(
                addToCart({
                  productId: item,
                  price: item.price,
                  qty: !item.amount ? 1 : item.amount,
                  stock: 16,
                  userId,
                  total: item.qty ? item.price * 1 : item.price * item.qty,
                })
              );
            }
            // addToCarts(
            //   item._id,
            //   item.price,
            //   !item.amount ? 1 : item.amount,
            //   !item.qty ? item.price * 1 : item.price * item.qty
            // )
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
