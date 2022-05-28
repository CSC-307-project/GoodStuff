
import React from "react";
import ReactDOM from "react-dom";
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
import { Marker } from "react-map-gl";
import InteractiveMap from "react-map-gl";
import { Link } from "react-router-dom";


  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  });

  export default function ProductPage() {
    const location = useLocation(); 
    const [markers, setMarkers] = React.useState([]);
    const handleClick = ({ lngLat: [longitude, latitude] }) =>
      setMarkers(markers => [...markers, { longitude, latitude }]);
    const [viewport, setViewport] = React.useState({
      latitude: -37.8136,
      longitude: 144.96332,
      zoom: 14.5,
      pitch: 40,
      bearing: 0
    });
    return (
      <React.Fragment >
        <CssBaseline />
        <Container 
          maxWidth="sm"
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: "xl",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1AA2027" : "#fff"
          }}
        >
          <Grid container spacing={5}>
            <Grid item>
              <ButtonBase sx={{ width: 1, height: 1 }}>
                <Img
                  alt="product"
                  src = {location.state.product_info.image} 
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={4} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div" fontSize={22}>
                  {location.state.product_info.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom fontSize={16}>
                  {'Product Description: ' + location.state.product_info.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={20}>
                  {'$'+location.state.product_info.price}
                  </Typography>
                </Grid>
                <Grid>
                  <InteractiveMap
                    mapDetail
                    onClick={handleClick}
                    width="100vw"
                    height="100vh"
                    mapboxApiAccessToken="pk.eyJ1IjoiY3NjMzA3IiwiYSI6ImNsM2d5bHB3OTBmM2QzYmxqMzl1am5sb2QifQ.3cp3sKxK3QcOrPugRV-vWg"
                    onViewportChange={viewport => setViewport(viewport)}
                    {...viewport}
                  >
                    {markers.length
                      ? markers.map((m, i) => (
                          // <Marker /> just places its children at the right lat lng.
                          <Marker {...m} key={i}>
                            {`Clicked here: \n ${m.longitude}, ${m.latitude}`}
                          </Marker>
                        ))
                      : null}
                  </InteractiveMap>
                </Grid>
                <Grid item>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                  <Button variant="contained" style={{display:"flex", alignItems:"center"}}>Confirm Purchase</Button>
                  </Typography>
                  <Typography sx={{ cursor: "pointer" }} variant="body2" fontSize={12}>
                  <Button variant="contained" onClick={() => {window.location = "/"}}
                        style={{display:"flex", alignItems:"center"}}>Return to Home</Button>
                  </Typography>
                </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div" fontSize={19}>
                  GoodStuff
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
  
  
  



// const ProductPage = (props) => {
// const ProductPage = () =>{ 
//     const location = useLocation(); 
//     //const {image} = location.state.product_info.image;
//     console.log(location.state.product_info)
//     return(
        
//         <div class="productContainerDetail">
//             <div>
//                 <img src={location.state.product_info.image} width = "600" height="400"/>
//                 {/* <img src ={require(product.image)}/>  */}
               
//             </div>
//             <div class="infoDetail">
//                 <div>
//                     <h1><b>Title:</b></h1>
//                     <h3>{location.state.product_info.title}</h3>
//                 </div>
//                 <div>
//                     <h1><b>Description: </b></h1>
//                     <p>{location.state.product_info.description}</p>
//                 </div>
//                 <div>
//                     <h1><b>Price:</b></h1>
//                     <h3>{'$'+location.state.product_info.price}</h3>
//                 </div>
//             </div>

//         {/* {console.log(props)} */}
//         </div>
        
//     );

// };

// export default ProductPage;