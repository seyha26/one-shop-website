"use client";
import React, { useState } from "react";
import {
  Grid,
  Dialog,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { getUserCart, removeProduct } from "@/redux/features/actions";
import { Icon } from "@iconify/react";

const CartList = ({ handleClose, open, setOpen }) => {
  const data = useSelector((state) => state.products.ordered);
  const dispatch = useDispatch();
  const removeItem = (id) => {
    dispatch(removeProduct(id));
  };

  // console.log(data);

  const checkOut = async () => {
    await fetch("http://localhost:3000/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid
      sx={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          zIndex: "999",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          sx={{
            justifySelf: "flex-end",
            display: "flex",
          }}
        >
          <Grid
            sx={{
              position: "fixed",
              right: "0",
              width: "450px",
              height: "100%",
              background: "#fff",
              overflowY: "auto !important",
            }}
          >
            <Grid sx={{ padding: "0 20px" }}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{
                  display: "flex",
                  right: "30px",
                  top: "16px",
                  position: "absolute",
                }}
              >
                <CloseOutlined />
              </IconButton>
              <Grid>
                <Typography
                  padding="20px 0 20px 0"
                  variant="body2"
                  className="text-xl"
                  textTransform="uppercase"
                  fontWeight="500"
                  color="#ddddd"
                >
                  Shoping Cart
                </Typography>
              </Grid>
            </Grid>
            <Divider />

            {data &&
              data.map((item, index) => (
                <Grid key={index}>
                  <Divider />
                  <Grid
                    padding="20px"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid width={"100%"}>
                      <Typography variant="h6">
                        {item.productId.name}
                      </Typography>
                      <Typography>
                        {item.qty} X ${item.productId.price}
                      </Typography>
                      <Grid marginTop="5px"></Grid>
                    </Grid>
                    <Grid
                      position={"relative"}
                      width={"120px"}
                      height={"120px"}
                      border={"1px solid #dddddd"}
                      padding="5px"
                      borderRadius="10px"
                    >
                      <Grid
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        overflow={"hidden"}
                        borderRadius="10px"
                      >
                        <img
                          style={{ maxWidth: "110px" }}
                          src={item.productId.imageUrl}
                          alt=""
                        />
                      </Grid>
                      <IconButton
                        className="btn bg-white"
                        sx={{
                          position: "absolute",
                          top: "-17px",
                          right: "-17px",
                        }}
                        onClick={() => removeItem(item._id)}
                      >
                        <Icon icon="zondicons:close-outline" />
                      </IconButton>
                    </Grid>
                    <Grid></Grid>
                  </Grid>
                  <Divider />
                </Grid>
              ))}
            <Grid
              padding={"20px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="body2" className="text-xl">
                Subtotal Amt.: $
                {data
                  .map((item) => item)
                  .reduce((prevValue, currentValue) => {
                    return prevValue + currentValue.price * currentValue.amount;
                  }, 0)}
              </Typography>
              <Typography variant="body2" className="text-xl">
                {data
                  .map((item) => item.amount)
                  .reduce((prevValue, currentValue) => {
                    return prevValue + currentValue;
                  }, 0)}
                Items
              </Typography>
            </Grid>
            <Grid padding={"20px"}>
              <Link href="/cart">
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    "&.MuiButton-outlined": {
                      borderColor: "#3085C3",
                    },
                  }}
                  onClick={() => setOpen(false)}
                >
                  View Cart
                </Button>
              </Link>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  "&.MuiButton-contained": {
                    background: "#F26522",
                    marginTop: "20px",
                  },

                  "&.Mui-disabled": {
                    color: "#ddddddd",
                    background: "#ccc",
                  },
                }}
                onClick={() => checkOut()}
                disabled={data.length === 0 ? true : false}
              >
                Check Out
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    </Grid>
  );
};

export default CartList;
