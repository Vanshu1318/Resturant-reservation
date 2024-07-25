import React from 'react';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// const Map = ({ location }) => {
//   const mapStyles = {
//     height: '400px',
//     width: '100%',
//   };
const Map =()=>{
  return (
    // <LoadScript googleMapsApiKey="YOUR_API_KEY">
    //   <GoogleMap
    //     mapContainerStyle={mapStyles}
    //     zoom={10}
    //     center={location}
    //   >
    //     <Marker position={location} />
    //   </GoogleMap>
    // </LoadScript>
    <div>
    <h1>Gupta Traders</h1>
    <iframe
      width="600"
      height="450"
      
      allowFullScreen
      src="https://www.google.com/maps/place/Gupta+Traders,+Johar,+Thandapani/@31.3807042,77.1509657,17z/data=!3m1!4b1!4m6!3m5!1s0x39050b0bf46a84c5:0xd5570730bc99bfcb!8m2!3d31.3807042!4d77.1535406!16s%2Fg%2F11gyysmvv4?entry=ttu"
    ></iframe>
  </div>
  );
};

export default Map;
