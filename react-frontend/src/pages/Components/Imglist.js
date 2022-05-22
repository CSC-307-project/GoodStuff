import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// let state = {
//   sellerId: "",
//     title: "",
//     price: "",
//     address: "",
//     description: "",
//     image: "",
//     tags: []
// };

// const getImageList = () => {
//   axios.get('http://localhost:5001/post')
//     .then((response) => {
//       const data = response.data;
//       this.setState({products: data})
//       console.log('Product Data received');
//     }).catch( ()=> {
//       alert('Not receiving data');
//     })
// }

// const theme = createTheme({
//   components: {
//     // Name of the component
//     ImageListItemBar: {
//       styleOverrides: {
//         // Name of the slot
//         title: {
//           // Some CSS
//           fontSize: "3rem",
//         },
//       },
//     },
//   },
// });

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
  useEffect(() => {
    async function getProductsList() {
      await axios
        .get("http://localhost:5001/post")
        .then((response) => {
          const data_list = response.data;
          setProductList(data_list);
          console.log("Product Data received");
        })
        .catch((res) => {
          alert("Not receiving data");
        });
    }
    getProductsList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ImageList sx={{ flexGrow: 1 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">December</ListSubheader>
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
              // position="top"
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
        {/* <Button>This button has disabled ripples.</Button> */}
      </ImageList>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
}

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//     author: "@bkristastucchio",
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//     author: "@rollelflex_graphy726",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//     author: "@helloimnik",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     author: "@nolanissac",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     author: "@hjrc33",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     author: "@arwinneil",
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//     author: "@tjdragotta",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//     author: "@katie_wasserman",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     author: "@silverdalex",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//     author: "@shelleypauls",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//     author: "@peterlaster",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     author: "@southside_customs",
//     cols: 2,
//   },
// ];
