import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
      MuiImageListItem:{ 
          styleOverrides:{ 

          }
      }
    },
  });

export default function Listings(props) {
  return (
    
    <ThemeProvider theme={theme}>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            MY LISTINGS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <ImageList sx={{ flexGrow: 1 }} cols={5}>
      {props.sell.map((item) => (
        <ImageListItem key={item._id}>
          <img
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar sx={{ fontWeight: 'bold' }}
            title={item.title}
            subtitle={<span>My Price: {'$'+ item.price}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </ThemeProvider> 
  );
}
