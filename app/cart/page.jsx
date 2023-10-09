"use client";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  incrementQuntity,
  decrementQuntity,
  removeProduct,
} from "@/redux/features/actions";
import { json } from "react-router-dom";
import uuidv3 from "uuid";

// const sendData = async () => {
//   await fetch("http://localhost:5000", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(
//       useSelector((state) => state.products.products.ordered)
//     ),
//   })
//     .then((res) => res.json())
//     .then(({ url }) => (window.location = url))
//     .catch((err) => {
//       console.log(err);
//     });
// };

const Cart = () => {
  const productInCart = useSelector((state) => state.products.ordered);
  const dispatch = useDispatch();

  const checkOut = async () => {
    await fetch("http://localhost:3000/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInCart),
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

  const removeItem = (id) => {
    dispatch(removeProduct(id));
  };
  const increment = (id) => {
    dispatch(incrementQuntity(id));
  };
  const decrement = (id) => {
    dispatch(decrementQuntity(id));
  };

  return (
    <Grid maxWidth={"1300px"} margin="auto">
      <Grid padding="20px">
        <Typography variant="h5" fontWeight="400" marginBottom="20px">
          Your Products in Cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={"200px"}>
                      <Typography variant="body2">Product Name</Typography>
                    </TableCell>
                    <TableCell width={"60px"}>
                      <Typography variant="body2">Amount</Typography>
                    </TableCell>
                    <TableCell width={"100px"}>
                      <Typography variant="body2">Price</Typography>
                    </TableCell>
                    <TableCell width={"100px"}>
                      <Typography variant="body2">Total</Typography>
                    </TableCell>
                    <TableCell width={"150px"}>
                      <Typography variant="body2" textAlign="center">
                        Remove Products
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {productInCart.map((product, index) => (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Grid
                          maxWidth={"170px"}
                          display={"flex"}
                          alignItems={"center"}
                          sx={{
                            border: "1px solid #dddddd",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => increment(product.id)}
                            sx={{
                              borderRight: "1px solid #dddddd",
                              "&.MuiButton-contained": {
                                background: "#F1EFEF",
                                borderRadius: "0",
                                boxShadow: "none",
                                width: "60px",
                              },
                            }}
                          >
                            <Icon
                              icon="fluent:add-28-filled"
                              style={{ fontSize: "12px", color: "green" }}
                            />
                          </Button>
                          <Typography
                            variant="body2"
                            sx={{ background: "light" }}
                            width={"60px"}
                            textAlign={"center"}
                          >
                            {product.amount}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => decrement(product.id)}
                            sx={{
                              borderLeft: "1px solid #dddddd",
                              "&.MuiButton-contained": {
                                background: "#F1EFEF",
                                borderRadius: "0",
                                boxShadow: "none",
                                width: "60px",
                              },
                            }}
                          >
                            <Icon
                              icon="fluent:subtract-28-filled"
                              style={{ fontSize: "12px", color: "red" }}
                            />
                          </Button>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          ${product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          ${product.total}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          variant="contained"
                          sx={{
                            "&.MuiButton-contained": {
                              background: "red",
                              marginTop: "10px",
                              textTransform: "none",
                              boxShadow: "none",
                            },
                          }}
                          onClick={() => removeItem(product.id)}
                        >
                          <Icon
                            icon="pajamas:remove"
                            style={{ fontSize: "17px" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>

            {productInCart.length === 0 ? (
              <Grid
                padding={"30px"}
                height={"40vh"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="h5" sx={{ color: "#F26522" }}>
                  You don&apos;t have any products in cart.
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={3} display={"flex"}>
            <Grid
              width="100%"
              border="1px solid #dddddd"
              padding="15px"
              borderRadius="5px"
            >
              <Grid marginBottom={"10px"}>
                <Typography margin="20px 0">Cart Totals</Typography>
                <Divider />
              </Grid>
              {productInCart.map((product, index) => (
                <Grid
                  display={"flex"}
                  justifyContent={"space-between"}
                  key={index}
                >
                  <Typography variant="body2">
                    {index}. {product.name}
                  </Typography>
                  <Typography
                    marginRight={"20px"}
                    variant="body2"
                    fontWeight={"600"}
                  >
                    ${product.total}
                  </Typography>
                </Grid>
              ))}
              <Grid
                marginTop={"10px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                padding="10px 20px"
                sx={{
                  background: "rgb(245, 252, 237)",
                  border: "1px solid rgb(214, 242, 186)",
                  borderRadius: "3px",
                  color: "rgb(0, 173, 48)",
                }}
              >
                <Typography fontWeight={"600"}>Amount to Pay:</Typography>
                <Typography fontWeight={"600"}>
                  $
                  {productInCart
                    .map((item) => item)
                    .reduce((prevValue, currentValue) => {
                      return (
                        prevValue + currentValue.price * currentValue.amount
                      );
                    }, 0)}
                </Typography>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  "&.MuiButton-contained": {
                    background: "#F26522",
                    marginTop: "10px",
                    textTransform: "none",
                  },
                  "&.Mui-disabled": {
                    color: "#ddddddd",
                    background: "#ccc",
                  },
                }}
                fullWidth
                onClick={() => checkOut()}
                disabled={productInCart.length === 0 ? true : false}
              >
                Confirm order
                <Icon
                  icon="grommet-icons:link-next"
                  style={{
                    width: "20px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                />
              </Button>
              <Typography
                variant="body2"
                marginTop={"10px"}
                sx={{
                  color: "#F26522",
                }}
              >
                Friendly Reminder: The more slots you purchase, the greater the
                chance of winning
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
