import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";


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
  },
});

export default function Imglist() {
  const [product_list, setProductList] = useState([]);
  const [search, setSearch] = useState({
    searchStr: "",
  });
  useEffect(() => {
    async function getProductsList() {
      await axios
        .get("http://localhost:5001/post", )
        .then((response) => {
          const data_list = response.data;
          setProductList(data_list);
          console.log("Product Data received");
        })
        .catch((res) => {
          console.log("Not receiving data");
        });
    }
    getProductsList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ImageList sx={{ flexGrow: 1 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">May</ListSubheader>
        </ImageListItem>
        {product_list.map((item) => (
          <ImageListItem key={item.image}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={"$" + item.price}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ThemeProvider>
  );
}