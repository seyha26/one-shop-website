import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  FormControl,
  Select,
  IconButton,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = ({ data }) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (data?.user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [data]);
  return (
    <Grid
      container
      width={"100%"}
      sx={{
        background: "#F26522",
        color: "#fff",
      }}
    >
      <Grid
        maxWidth="1300px"
        width="1300px"
        marginX="auto"
        paddingX="15px"
        height="35px"
        display="flex"
      >
        <Grid
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-between"
        >
          <Grid display={"flex"} alignItems={"center"} gap={"5px"}>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              Download
            </Typography>
            <Divider
              orientation="vertical"
              sx={{
                height: "20px",
                borderColor: "white",
              }}
            />
            <Typography variant="body2">Follow us on</Typography>
            <Grid>
              <IconButton
                style={{
                  padding: "0",
                  position: "relative",
                  left: "-5px",
                  width: "35px",
                  height: "35px",
                }}
              >
                <Icon
                  icon="ic:baseline-facebook"
                  style={{ color: "#fff", width: "40px" }}
                />
              </IconButton>
              <IconButton
                style={{
                  padding: "0",
                  position: "relative",
                  left: "-5px",
                  width: "35px",
                  height: "35px",
                }}
              >
                <Icon
                  icon="ri:instagram-fill"
                  style={{ color: "#fff", width: "40px" }}
                />
              </IconButton>
              <IconButton
                style={{
                  padding: "0",
                  position: "relative",
                  left: "-5px",
                  width: "35px",
                  height: "35px",
                }}
              >
                <Icon
                  icon="mdi:youtube"
                  style={{ color: "#fff", width: "40px" }}
                />
              </IconButton>
              <IconButton
                style={{
                  padding: "0",
                  position: "relative",
                  left: "-5px",
                  width: "35px",
                  height: "35px",
                }}
              >
                <Icon
                  icon="ic:baseline-tiktok"
                  style={{ color: "#fff", width: "40px" }}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Grid display="flex" alignItems="center" gap="20px">
            <Button
              variant="contained"
              sx={{
                "&.MuiButton-contained": {
                  background: "#fff",
                  color: "#F26522",
                  height: "25px",
                  borderRadius: "20px",
                  textTransform: "none",
                  boxShadow: "none",
                },
              }}
            >
              Recharge
            </Button>
            {isLogin ? (
              <Link href="/login">
                <Button
                  variant="contained"
                  sx={{
                    "&.MuiButton-contained": {
                      background: "#fff",
                      color: "#F26522",
                      height: "25px",
                      borderRadius: "20px",
                      textTransform: "none",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => signOut()}
                >
                  Log Out
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    Register
                  </Typography>
                </Link>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "20px",
                    borderColor: "white",
                  }}
                />
                <Link href="/login">
                  <Button
                    variant="contained"
                    sx={{
                      "&.MuiButton-contained": {
                        background: "#fff",
                        color: "#F26522",
                        height: "25px",
                        borderRadius: "20px",
                        textTransform: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}

            <ChangeLanguage color="#fff" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
