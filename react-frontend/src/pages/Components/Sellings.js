import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const commonTagSize = 3;

const theme = createTheme({
  components: {
    // Name of the component
    MuiImageListItemBar: {
      styleOverrides: {
        // Name of the slot
        title: {
          // Some CSS
          fontSize: "1.4rem",
        },
        subtitle: {
          fontSize: "1.2rem",
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {},
    },
  },
});

function commonTags(objs) {
  objs = objs.sell;
  if (objs === undefined || objs === null) {
    return "none";
  }
  let tags = [];
  for (let i = 0; i < objs.length; i++) {
    tags = tags.concat(objs[i].tags);
    const address = objs[i].address.replace(/[0-9]/g, "").split(/[, ]+/);
    tags = tags.filter((x) => !address.includes(x));
  }
  tags = tags.filter((x) => x !== "");
  return topKFrequent(tags, commonTagSize).join(", ");
}

function topKFrequent(nums, k) {
  let a = new Map();
  let b = [];

  for (let i = 0; i < nums.length; i++) {
    a.set(nums[i], (a.get(nums[i]) || 0) + 1);
  }

  for (let [key, value] of a.entries()) {
    b.push({ key: key, value: value });
  }

  return b
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .slice(0, k)
    .map((x) => x.key);
}

export default function Sellings(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#2E3B55" }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              MY SOLD LISTINGS, Quantity:{" "}
              {props.sell !== undefined ? props.sell.length : 0}; Profits: $
              {props.sell !== undefined
                ? props.sell.reduce((total, obj) => obj.price + total, 0)
                : 0}
              ; Common Tags: {commonTags(props)}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <ImageList sx={{ flexGrow: 1 }} cols={5}>
        {props.sell !== undefined
          ? props.sell.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={`${item.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{ fontWeight: "bold" }}
                  title={item.title}
                  subtitle={<span>My Price: {"$" + item.price}</span>}
                  position="below"
                />
              </ImageListItem>
            ))
          : undefined}
      </ImageList>
    </ThemeProvider>
  );
}
