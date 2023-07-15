import './App.css';
import Topbuttons from "./components/Topbuttons";
import Inputs from './components/Inputs';
import Timeandlocation from './components/Timeandlocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import Header from './components/Header';
import getFormattedweatherdata from './services/Weatherservice';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){

   const [query, setquery] = useState({q:'Tokyo'})
   const [units, setunits] = useState('metric')
   const [weather, setweather] = useState(null);

   useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedweatherdata({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setweather(data);
      });
    };

    fetchWeather();
  }, [query, units]);
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };
  return (
   <div  className={`mx-auto max-w-screen-md 
   mt-4 py-5 px-32 bg-gradient-to-br
    from-red-300 to-blue-300 
    h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
    
    <Header/>
    <Topbuttons setquery={setquery}/>
    <Inputs setquery={setquery} units={units} setunits={setunits}/>
    {weather && (
      <div>
        <Timeandlocation weather={weather} />
        <TemperatureDetails weather={weather} />
        <Forecast title="hourly forecast" items={weather.hourly} />
        <Forecast title="daily forecast" items={weather.daily} />
      </div>
    )}
    <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
     </div>

  );
}

export default App;
