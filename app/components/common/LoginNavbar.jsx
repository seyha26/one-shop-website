"use client";
import React, { useState } from "react";
import {
  Grid,
  Button,
  Badge,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";
import { usePathname } from "next/navigation";
import Search from "./Search";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import CartList from "./CartList";
import { useSession } from "next-auth/react";
const LoginHeader = ({ setSearchParams, searchParams }) => {
  const pathname = usePathname();
  const data = useSelector((state) => state.products.ordered.length);
  const fav = useSelector((state) => state.products.favorite.length);
  const session = useSession();
  const [open, setOpen] = React.useState(false);
  // console.log(session);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid
      position={"sticky"}
      className="shadow-sm"
      sx={{
        top: "0",
        width: "100%",
        background: "#fff",
        margin: "auto",
        zIndex: "99",
      }}
    >
      <Grid
        maxWidth="1300px"
        margin="auto"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
      >
        <Link href="/">
          <Grid>
            <Image
              src="/assets/logo/logo.png"
              alt=""
              width={83}
              style={{
                maxWidth: "120px",
              }}
              height={83}
            />
          </Grid>
        </Link>
        {pathname === "/login" || pathname === "/register" ? (
          <ChangeLanguage color="#000" />
        ) : (
          <>
            <Search
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
            <Grid display="flex" gap="1rem">
              {session?.data?.user ? (
                <Link href={`/favorite/${session?.data?.user?._id}`}>
                  <IconButton
                    sx={{
                      "&.MuiIconButton-root": {
                        background: "rgb(255, 220, 204)",
                      },
                    }}
                  >
                    <Badge badgeContent={fav} color="error">
                      <Icon
                        icon="material-symbols:favorite-outline"
                        style={{ color: "rgb(242, 101, 34)" }}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              ) : (
                <Link href={`/login`}>
                  <IconButton
                    sx={{
                      "&.MuiIconButton-root": {
                        background: "rgb(255, 220, 204)",
                      },
                    }}
                  >
                    <Badge badgeContent={fav} color="error">
                      <Icon
                        icon="material-symbols:favorite-outline"
                        style={{ color: "rgb(242, 101, 34)" }}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              )}
              <IconButton
                sx={{
                  "&.MuiIconButton-root": {
                    background: "rgb(255, 220, 204)",
                  },
                }}
                onClick={handleClickOpen}
              >
                <Badge badgeContent={data} color="success">
                  <Icon
                    icon="mdi:cart-outline"
                    style={{ color: "rgb(242, 101, 34)" }}
                  />
                </Badge>
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      <CartList open={open} handleClose={handleClose} setOpen={setOpen} />
    </Grid>
  );
};

export default LoginHeader;
