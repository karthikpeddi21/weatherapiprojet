import React from 'react'
function Topbuttons({setquery}) {
      const cities = [
        {
            id:1,
            title:'Warangal'
        },
        {
            id:2,
            title:'Rourkela'
        },
        {
            id:3,
            title:'Odisha'
        },
        {
            id:4,
            title:'Bhubaneshwar'
        },
        {
            id:5,
            title:'India'
        }, 
      ]

  return  <div className="flex items-center
  justify-around my-6">
     {cities.map((city)=>(
      <button key={city.id} 
      onClick={()=>setquery({q:city.title})} className="text-black text-lg font-medium">{city
      .title }</button>
     ))}
  </div> 
        
  
}

export default Topbuttons
