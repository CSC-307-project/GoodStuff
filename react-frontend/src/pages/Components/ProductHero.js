import * as React from 'react';
import Button from '../CustomMUI/Button';
import Typography from '../CustomMUI/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../../img/main.jpeg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Welcome to GoodStuff
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Enjoy the best deal of GoodStuff here.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href='../Register'
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
