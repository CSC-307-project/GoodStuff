import React from "react";
import backgroundImage from '../../img/main.jpeg';

export default function ProfileImage() {
  return (
    <div style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        width:'1200px',
        height:'500px' 
      }}>
    </div>
  );
}
