"use client";
import React from "react";
import { Divider, Typography, Grid, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import productCategories from "@/categories/productCategories";
import { useDispatch } from "react-redux";
import { getProductsByCategory } from "@/redux/features/actions";
const Footer = () => {
  const dispatch = useDispatch();
  const selectCategory = (cate) => {
    dispatch(getProductsByCategory(cate));
  };
  return (
    <Grid
      sx={{
        borderTop: "3px solid #F26522",
        padding: "50px 0 0",
      }}
    >
      <Grid>
        <Grid maxWidth="1300px" margin="auto" padding="40px 10px">
          <Typography variant="h6" fontWeight={"bold"}>
            Category
          </Typography>

          <Grid container spacing={2}>
            {productCategories.map(
              (cate, index) =>
                index <= 5 && (
                  <Grid item xs={2} key={cate}>
                    <Link href={`/categories/${cate}`}>
                      <Typography
                        fontWeight="500"
                        sx={{
                          display: "inline",
                          textTransform: "uppercase",
                          "&:hover": {
                            color: "#F26522",
                          },
                        }}
                        onClick={() => selectCategory(cate)}
                      >
                        {cate}
                      </Typography>
                    </Link>
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
        <Divider />
        <Grid sx={{ background: "#FAFAFA" }}>
          <Grid
            maxWidth="1300px"
            margin="auto"
            padding="40px 10px 80px"
            sx={{ background: "#FAFAFA" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography fontWeight="600">Customer Service</Typography>

                <Typography>Contact Us</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight="600">About One Shop</Typography>

                <Typography>Privacy Policy</Typography>

                <Typography>Terms & Conditions</Typography>

                <Typography>Help Center</Typography>

                <Typography>Return & Refund Policy</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight="600">Payment</Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid
                      sx={{
                        border: "2px solid #DDDDDD",
                        borderRadius: "10px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      <Image
                        width="50"
                        height="70"
                        src="/assets/Footer/aba.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      sx={{
                        border: "2px solid #DDDDDD",
                        borderRadius: "10px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      <Image
                        width="50"
                        height="70"
                        src="/assets/Footer/wechatpay.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid
                      sx={{
                        border: "2px solid #DDDDDD",
                        borderRadius: "10px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      <Image
                        width="50"
                        height="70"
                        src="/assets/Footer/union_pay.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      sx={{
                        border: "2px solid #DDDDDD",
                        borderRadius: "10px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      <Image
                        width="50"
                        height="70"
                        src="/assets/Footer/alipay.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid
                      sx={{
                        border: "2px solid #DDDDDD",
                        borderRadius: "10px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      <Image
                        width="50"
                        height="70"
                        src="/assets/Footer/lamar-bank-and-trust.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Typography fontWeight="600">One Shop App Download</Typography>
                <Grid container spacing={2} marginTop="3px">
                  <Grid item xs={6}>
                    <Grid>
                      <Link href="https://apps.apple.com/in/app/oneshop/id6446101302">
                        <Image
                          width="200"
                          height="20"
                          src="/assets/Footer/downloadappstore.png"
                          alt=""
                        />
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid>
                      <Link href="https://play.google.com/store/apps/details?id=com.loma.oneshop&pli=1">
                        <Image
                          width="200"
                          height="20"
                          src="/assets/Footer/get-it-on.png"
                          alt=""
                        />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop="3px">
                  <Grid item xs={6}>
                    <Grid>
                      <Image
                        width="150"
                        height="200"
                        src="/assets/logo/qr-code-apple-store.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid>
                      <Image
                        width="150"
                        height="200"
                        src="/assets/logo/qr-code-play-store.png"
                        alt=""
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Typography fontWeight="600" marginTop={3}>
                  Follow Us
                </Typography>
                <Grid
                  display={"flex"}
                  justifyContent={"space-between"}
                  marginTop={"10px"}
                >
                  <Icon
                    icon="ic:baseline-facebook"
                    style={{ color: "#000", fontSize: "50px" }}
                  />
                  <Icon
                    icon="ri:instagram-fill"
                    style={{ color: "#000", fontSize: "50px" }}
                  />
                  <Icon
                    icon="mdi:youtube"
                    style={{ color: "#000", fontSize: "50px" }}
                  />
                  <Icon
                    icon="ic:baseline-tiktok"
                    style={{ color: "#000", fontSize: "50px" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
