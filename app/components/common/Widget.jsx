import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import HomeList from "./HomeList";

const Widget = ({ title, side }) => {
  return (
    <Grid
      sx={{
        width: "100%",
        background: "#ffffffc9",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Divider>
        <Typography
          sx={{
            background: "#ff7100",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: "meduim",
            color: "#fff",
          }}
        >
          {title}
        </Typography>
      </Divider>
      <Grid item container width="100%">
        {side === "left" ? (
          <Grid
            item
            width="100%"
            display="flex"
            flexDirection="column"
            gap={1}
            marginTop="5px"
            height="600px"
            overflow="auto"
          >
            <HomeList />
          </Grid>
        ) : (
          <Grid item container spacing={1} 
          marginTop="5px">
            <Grid
              item
              xs={8}
              width="100%"
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <div className="video-responsive">
                <iframe
                  width="100%"
                  height="375"
                  src="https://www.youtube.com/embed/VK8UkagZJ7U?si=Tf0bmb4rkkDcVKn9"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <Typography variant="body2">
              Get a chance to win an iPhone 14 Pro Max for just $1 at OneShop!
              Simply pay the entry fee and you&apos;ll be entered into a lucky draw.
              Don&apos;t miss this opportunity to win the latest and greatest
              smartphone in town.
            </Typography>
            </Grid>
            
            <Grid
              item
              xs={4}
              width="100%"
              display="flex"
              flexDirection="column"
              gap={1}
              height="600px"
              overflow="auto"
            >
              <HomeList />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Widget;
