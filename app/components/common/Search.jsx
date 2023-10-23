import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { searchProduct } from "@/redux/features/actions";

const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    dispatch(searchProduct(value));
  }, [value]);
  return (
    <>
      <FormControl
        fullWidth
        variant="outlined"
        size="small"
        color="warning"
        sx={{
          width: "100%",
          margin: "0 100px 0 10px",
          fontSize: "0.9rem",
        }}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{
            fontSize: "0.9rem",
          }}
        >
          Search Products
        </InputLabel>
        <OutlinedInput
          sx={{
            fontSize: "0.9rem",
          }}
          value={value}
          onChange={(e) => handleChange(e)}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <Icon
                icon="material-symbols:search"
                width={25}
                style={{ color: "rgb(242, 101, 34)" }}
              />
            </InputAdornment>
          }
          label="Search Products"
        />
      </FormControl>
    </>
  );
};

export default Search;
