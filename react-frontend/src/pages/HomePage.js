import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const HomePage = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      {<Button variant="contained">Hello World</Button>
      /* <Header />
      <ShopSection />
      <CalltoActionSection />
      <ContactInfo />
      <Footer /> */}
    </div>
  );
}

export default HomePage;

