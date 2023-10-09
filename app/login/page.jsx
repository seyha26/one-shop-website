"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/features/actions";
import { redirect, useRouter } from "next/navigation";
import { Route } from "react-router-dom";
import { loginUser } from "@/helpers";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMessage, setusernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isusernameEmpty, setIsusernameEmpty] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isusernameValid, setIsusernameValid] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isShowPassword, setIsShowPasswor] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChangePrefix = (event) => {
    setPrefix(event.target.value);
  };

  const { data } = useSession();
  console.log(data);
  const showPassword = () => {
    setIsShowPasswor(!isShowPassword);
  };
  // const handleChange = (e) => {
  //   setPhoneNumber(prefix + value.username)
  //   console.log(value);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginRes = await loginUser({
        redirect: false,
        username,
        password,
        callbackUrl: "/",
      });
      console.log(loginRes);
      console.log(loginRes && !loginRes.ok);
      if (loginRes && !loginRes.ok) {
        setSubmitError(loginRes.error || "");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        setSubmitError(errorMsg);
      }
    }

    setLoading(false);
  };
  return (
    <Grid
      sx={{
        background: "#F5F5F5",
      }}
    >
      <Grid container padding="40px 0">
        <Grid
          boxShadow={10}
          borderRadius={1}
          sx={{
            width: "800px",
            height: "500px",
            margin: "40px auto",
            display: "flex",
            minHeight: "500px",
          }}
        >
          <Grid
            item
            xs={6}
            display={"flex"}
            padding="16px"
            flexDirection={"column"}
            alignItems={"self-start"}
          >
            <Typography variant="h6" padding="50px 0">
              Login
            </Typography>
            <Grid
              width="100%"
              paddingRight="8px"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={4}
            >
              <form
                style={{
                  width: "100%",
                }}
              >
                <Grid display={"flex"} flexDirection={"column"} gap={2}>
                  <Grid>
                    <label
                      htmlFor="username"
                      fontSize="13px"
                      fontWeight={"600"}
                      marginBottom={"10px"}
                    >
                      Username
                    </label>
                    <Grid>
                      <OutlinedInput
                        id="username"
                        onChange={(e) => setusername(e.target.value)}
                        name="username"
                        value={username}
                        fullWidth
                        type="text"
                        sx={{
                          padding: "0 20px 0 5px",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <Icon
                              icon="mdi:user"
                              style={{ fontSize: "25px" }}
                            />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    {!isCorrect && (
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        {usernameMessage}
                      </Typography>
                    )}
                  </Grid>
                  <Grid>
                    <label
                      htmlFor="password"
                      fontSize="13px"
                      fontWeight={"600"}
                      marginBottom={"10px"}
                    >
                      Password
                    </label>
                    <OutlinedInput
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      name="password"
                      fullWidth
                      type={isShowPassword ? "text" : "password"}
                      sx={{
                        padding: "0 20px 0 5px",
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={showPassword}
                          >
                            {!isShowPassword ? (
                              <Icon icon="raphael:lock" />
                            ) : (
                              <Icon icon="raphael:unlock" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {!isCorrect && (
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        {passwordMessage}
                      </Typography>
                    )}
                  </Grid>
                  <Grid display={"flex"} justifyContent={"flex-end"}>
                    <Link
                      href="/login/forgot"
                      style={{
                        color: "gray",
                        justifySelf: "flex-end",
                        fontSize: "13px",
                      }}
                    >
                      Forgot Password
                    </Link>
                  </Grid>
                  <Grid
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={1}
                  >
                    <Link href="/" className="h-[35px] text-[0.8rem] w-full">
                      <Button
                        variant="contained"
                        sx={{
                          "&.MuiButton-contained": {
                            background: "#000",
                          },
                        }}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="warning"
                      className="btn bg-[#ff7100] h-[35px] text-[0.8rem]"
                      fullWidth
                      type="submit"
                      disabled={loading}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            gap={10}
            flexDirection={"column"}
            alignItems={"center"}
            item
            xs={6}
            sx={{
              background: "#FB8954",
            }}
            borderRadius={"0 5px 5px 0"}
          >
            <Grid id="login_logo" display={"flex"} alignItems={"center"}>
              <Image
                src="/assets/logo/1ne_shop_logo.png"
                width={90}
                height={50}
                alt="one shop logo"
              />
            </Grid>
            <Grid>
              <Typography variant="h6" fontWeight={"bold"} color="#fff">
                Your own one dollar shop
              </Typography>
            </Grid>
            <Grid>
              <Link href="/register">
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    "&.MuiButton-outlined": {
                      color: "#fff",
                      border: "1px #fff solid",
                      width: "150px",
                      height: "35px",
                      fontSize: "0.8rem",
                    },
                    "&:hover": {
                      "&.MuiButton-outlined": {
                        color: "#fff",
                        border: "1px #ff7100 solid",
                        background: "transparent",
                      },
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
