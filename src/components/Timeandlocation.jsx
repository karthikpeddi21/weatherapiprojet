import React from 'react'
import { formatToLocalTime } from '../services/Weatherservice'

function Timeandlocation({weather:{dt,timezone, name , country}}){
  return  <div>
  <div className="flex items-center justify-center my-6">
  <p className="text-xl text-black font-bold">
    {formatToLocalTime(dt,timezone)}
  </p>
  </div>
  <div className="flex items-center justify-center my-3">
  <p className="text-4xl text-black font-bold">
    {`${name}, ${country}`}
  </p>
  </div>
</div>

  
}

export default Timeandlocation