"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Backdrop,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import axios, { Axios, AxiosError } from "axios";
import { loginUser } from "@/helpers";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log("first register");
      // console.log("test");
      const apiRes = await axios.post("/api/auth/signup", {
        username: data.username,
        password: data.password,
        fullName: data.lastName + " " + data.firstName,
      });
      // console.log(apiRes);
      if (apiRes?.data?.success) {
        // console.log("api REs");

        const loginRes = await loginUser({
          username: data.username,
          password: data.password,
        });
        // console.log(loginRes && !loginRes.ok);
        if (loginRes && !loginRes.ok) {
          setSubmitError(loginRes.error || "");
        } else {
          loginSuccess();
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        setSubmitError(errorMsg);
      }
    }
    setLoading(false);
  };

  const loginSuccess = () => toast.success("Logged In");

  return (
    <Grid
      sx={{
        background: "#F5F5F5",
      }}
    >
      <Toaster position="bottom-right" />
      <Grid container padding="40px 0" className="px-2 md:p-0">
        <Grid
          item
          boxShadow={10}
          borderRadius={1}
          sx={{
            width: "800px",
            height: "500px",
            margin: "40px auto",
            display: "flex",
            minHeight: "500px",
            justifyContent: "center",
          }}
        >
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => setLoading(true)}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid
            className="hidden md:flex"
            display={"flex"}
            justifyContent={"center"}
            gap={10}
            flexDirection={"column"}
            alignItems={"center"}
            item
            xs={6}
            md={12}
            sx={{
              background: "#FB8954",
            }}
            borderRadius={" 5px 0 0 5px"}
          >
            <Grid id="login_logo">
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
              <Link href="/login">
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
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            className="flex-center"
            maxWidth="100%"
            display={"flex"}
            padding="16px"
            flexDirection={"column"}
            alignItems={"self-start"}
            justifyContent={"center"}
          >
            <Typography variant="h6">Register</Typography>
            <Grid
              className="w-full"
              paddingRight="8px"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={4}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <Grid display={"flex"} flexDirection={"column"} gap={1}>
                  <Grid display={"flex"} flexDirection={"column"} gap={1}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography
                          fontSize="13px"
                          fontWeight={"600"}
                          marginBottom={"10px"}
                        >
                          First Name
                        </Typography>
                        <TextField
                          size="small"
                          name="firstName"
                          value={data.firstName}
                          onChange={(e) => handleChange(e)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          fontSize="13px"
                          fontWeight={"600"}
                          marginBottom={"10px"}
                        >
                          Last Name
                        </Typography>
                        <TextField
                          size="small"
                          name="lastName"
                          value={data.lastName}
                          onChange={(e) => handleChange(e)}
                        />
                      </Grid>
                    </Grid>
                    <Grid display={"grid"}>
                      <Typography
                        fontSize="13px"
                        fontWeight={"600"}
                        marginBottom={"10px"}
                      >
                        Username
                      </Typography>
                      <Grid gap>
                        <OutlinedInput
                          size="small"
                          // onChange={(e) => setusername(e.target.data)}
                          name="username"
                          // data={username}
                          value={data.username}
                          onChange={(e) => handleChange(e)}
                          fullWidth
                          type="text"
                          sx={{
                            padding: "0 10px 0 0px",
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
                      {/* {!isCorrect && (
                        <Typography
                          color="error"
                          sx={{
                            fontSize: "0.8rem",
                          }}
                        >
                          {usernameMessage}
                        </Typography>
                      )} */}
                    </Grid>
                    <Grid>
                      <Typography
                        fontSize="13px"
                        fontWeight={"600"}
                        marginBottom={"10px"}
                      >
                        Password
                      </Typography>
                      <OutlinedInput
                        size="small"
                        // onChange={(e) => setPassword(e.target.data)}
                        // data={password}
                        name="password"
                        fullWidth
                        // type={isShowPassword ? "text" : "password"}
                        value={data.password}
                        onChange={(e) => handleChange(e)}
                        sx={{
                          padding: "0 15px 0 0px",
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              // onClick={showPassword}
                            >
                              {/* {!isShowPassword ? (
                                
                              ) : (
                                <Icon icon="raphael:unlock" />
                              )} */}
                              <Icon icon="raphael:lock" />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={1}
                      margin={"10px 0"}
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
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    {submitError && (
                      <Typography
                        sx={{
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {submitError}
                      </Typography>
                    )}
                  </Grid>

                  <Grid>
                    <Typography fontSize=".8rem" textAlign={"center"}>
                      By signing up, you agree to One Shop’s{" "}
                      <span style={{ color: "#ff7100" }}>Terms of Service</span>{" "}
                      & <span style={{ color: "#ff7100" }}>Privacy Policy</span>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
