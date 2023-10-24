import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "@/redux/features/actions";
import { IconButton } from "@mui/material";

const Search = ({ searchParams, setSearchParams }) => {
  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };
  const isSearching = useSelector((state) => state.products.isSearching);

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
          value={searchParams}
          onChange={(e) => handleChange(e)}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              {isSearching ? (
                <Icon
                  icon="ic:baseline-clear"
                  width={25}
                  style={{
                    color: "rgb(242, 101, 34)",
                  }}
                  className="btnClear"
                  onClick={() => setSearchParams("")}
                />
              ) : (
                <Icon
                  icon="material-symbols:search"
                  width={25}
                  style={{ color: "rgb(242, 101, 34)" }}
                />
              )}
            </InputAdornment>
          }
          label="Search Products"
        />
      </FormControl>
    </>
  );
};

export default Search;
