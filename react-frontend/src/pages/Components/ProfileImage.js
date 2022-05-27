import React from "react";
import backgroundImage from '../../img/main.jpeg';

export default function ProfileImage() {
  return (
    <div style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        width:'1430px',
        height:'1200px' 
      }}>
    </div>
  );
}
