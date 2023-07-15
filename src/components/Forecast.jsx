import React from 'react'
import { iconurlfromcode } from '../services/Weatherservice';
function Forecast({title, items}) {
  console.log(items);
  return (
    <div>
    <div className="flex justify-start items-center mt-6">
    <p className="text-navy-blue text-2xl uppercase">{title}</p>
   </div>
   <hr className="my-2 text-black text-5xl"/>
   <div className="flex flex-row items-center justify-between text-dark-blue">
   {items.map((item, index) => (
     <div
       key={index}
       className="flex flex-col items-center justify-center"
     >
       <p className="text-xl font-medium">{item.title}</p>
       <img
         src={iconurlfromcode(item.icon)}
         className="w-12 my-1"
         alt=""
       />
       <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
     </div>
   ))}
   </div>
    </div>
  );
}

export default Forecast
