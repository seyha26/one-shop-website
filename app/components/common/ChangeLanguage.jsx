'use client'
import React, {useState} from 'react'
import { Grid, FormControl, Select, MenuItem } from "@mui/material";
import { Icon } from "@iconify/react";

const ChangeLanguage = ({ color }) => {
  const [langauge, setLangauge] = useState(1);
  const handleChange = (event) => {
    setLangauge(event.target.value);
  };
  return ( 
    <Grid display={"flex"} gap={1} alignItems={"center"} zIndex="999">
    <FormControl
      sx={{
        minWidth: 100,
        display: 'flex',
        alignItems: "center",
        flexDirection: "row",
        gap: ".5rem"
      }}
    >
      <Icon icon="clarity:world-line" width={20} height={20} />
      <Select
        sx={{
            height: "40px",
            color: color,
            boxShadow: "none",
            fontSize: "0.9rem",
            '.MuiOutlinedInput-notchedOutline': {
                border: "0"
            },
            '.MuiSvgIcon-root': {
                fill: `${color} !important`,
            }
        }}
        onChange={handleChange}
        value={langauge}
      >
        <MenuItem value={1}>English</MenuItem>
        <MenuItem value={2}>Chinise</MenuItem>
        <MenuItem value={3}>Khmer</MenuItem>
      </Select>
    </FormControl>
    </Grid>
  )
}

export default ChangeLanguage