import React, {useState} from 'react';
import { UilSearch,UilLocationPinAlt } from '@iconscout/react-unicons';
import {toast} from "react-toastify";
function Inputs({setquery, units, setunits}){
  const [city, setcity] = useState("");

  const handleunitchange = (e)=>{
    const selectedunit = e.currentTarget.name;
    if(units != selectedunit) setunits(selectedunit);
  };
  const handlesearchclick = () =>{
    if(city!="") setquery({q : city});
  };
  const handlelocationclick = ()=>{
    if(navigator.geolocation){
      toast.info("Fetching your location!.");
      navigator.geolocation.getCurrentPosition((position)=>{
        toast.success("Location Fetched!");
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setquery({
          lat,long
        });
      });
    };
  }
  return(
    <div className="flex fle-row justify-center my-6 ">
      <div className="flex flex-row w-3/4 items-center
      justrify-center space-x-4 ">
      <input type="text" 
      value={city}
      onChange = {(e)=>setcity(e.currentTarget.value)}
      placeholder="Search for location..... "
      className="text-x1
      font-light 
      p-2
      w-full
      shadow-xl 
      focus:outline-none
      capitalize 
      placeholder:lowercase"/>
      <UilSearch 
      size={28} 
      onClick = {handlesearchclick}
      className="text-black 
      cursor-pointer
      transition ease-out 
      hover:scale-125"/>
      <UilLocationPinAlt
      size={28} 
      onClick = {handlelocationclick}
      className="text-black
      cursor-pointer 
      transition ease-out
      hover:scale-125"/>
     </div>
     <div className="flex flex-row 
     w-1/4  
     items-center justify-center">
     <button name="metric" 
     onClick={handleunitchange}
     className="text-xl
       font-bold
       text-black
       p-3
       ">°C
     </button>
     <p className="text-red-600 text-2xl mx-1">|</p>
     <button name="imperial"
     onClick={handleunitchange}
     className="text-xl
     font-bold
     text-black p-3">°F
     </button>
     </div>
    </div>
  ); 
}

export default Inputs