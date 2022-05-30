
import React from "react";
import "./ProductPage.css"; 
import {useLocation} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'; 
import axios from "axios";
import Map, { Marker, ScaleControl, FullscreenControl } from "react-map-gl";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

 
  
  export default function ProductPage() {
    const location = useLocation(); 
    const userId = Cookies.get("user_id"); 
    const handlePurchase = async() => {
      if (location.state.product_info.sellerId != userId){
        await axios.post("http://localhost:5001/purchaseitem", { 
          itemId: product_id, 
          buyerId: buyer_id
        }).then((res) =>{ 
          window.location = "/profile"
        }
        ).catch((err) =>{ 
          console.log(err); 
        }
        )
      }else if(location.state.product_info.sellerId == userId){ 
        alert('This is your own Listing');
      }
    }

  let buyer_id = Cookies.get("user_id");
  let product_id = location.state.product_info._id;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "xl",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1AA2027" : "#fff",
        }}
      >
        <Grid container spacing={5}>
          <Grid item>
            <ButtonBase sx={{ width: 1, height: 1 }}>
              <Img alt="product" src={location.state.product_info.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  fontSize={22}
                >
                  {location.state.product_info.title}
                </Typography>
                <Typography variant="body2" gutterBottom fontSize={16}>
                  {"Description: " + location.state.product_info.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={20}
                >
                  {"$" + location.state.product_info.price}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={15}
                >
                  {location.state.product_info.address}
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    <Button
                      variant="contained"
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={handlePurchase}
                    >
                      Confirm Purchase
                    </Button>
                  </Typography>
                  <Typography sx={{ cursor: "pointer" }} variant="body2" fontSize={12}>
                    <Button variant="contained" onClick={() => {window.location = "/"}}
                          style={{display:"flex", alignItems:"center"}}>Return to Home</Button>
                  </Typography>
                </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div" overflow={true} fontSize={20}>
                  GoodStuff
                </Typography>
              </Grid>
              <Map
                initialViewState={{
                  longitude: location.state.product_info.cordinates[0],
                  latitude: location.state.product_info.cordinates[1],
                  zoom: 16,
                }}
                style={{ height: 400, marginTop: 25 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoiY3NjMzA3IiwiYSI6ImNsM2d5bHB3OTBmM2QzYmxqMzl1am5sb2QifQ.3cp3sKxK3QcOrPugRV-vWg"
              >
                <FullscreenControl position="top-left" />
                <ScaleControl />
                <link
                  href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
                  rel="stylesheet"
                ></link>
                <Marker
                  longitude={location.state.product_info.cordinates[0]}
                  latitude={location.state.product_info.cordinates[1]}
                  anchor="bottom"
                ></Marker>
              </Map>
            </Grid>
          </Grid>
      </Container>
    </React.Fragment>
  );
}

/* <FullscreenControl position="top-left" />
      <ScaleControl />
      <Marker
        longitude={location.state.product_info.cordinates[0]}
        latitude={location.state.product_info.cordinates[1]}
        anchor="bottom"
        offsetTop={-600}
        offsetLeft={-400 / 2}
      ></Marker> 
*/
