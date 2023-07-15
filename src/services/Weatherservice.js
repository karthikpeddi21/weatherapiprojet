import { DateTime } from "luxon";
const API_KEY = "85ee1ed37a20b21e9163cc34f570a3cf";
const base_url = "https://api.openweathermap.org/data/2.5";
const getweatherdata = (infoType, searchParams)=>{
    const url = new URL(base_url + "/"+ infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});
    console.log(url);
    return fetch(url)
    .then((res)=>res.json());
};
const formatcurrentweather = (data) =>{
       const {
        coord: {lat,lon},
        main : {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys : {country, sunrise, sunset},
        weather,
        wind : {speed},
       } = data;

       const {main : details, icon} = weather[0];

       return{
        lat,
        lon,
        temp,
        feels_like,
        temp_max,
        temp_min,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,

       };
};
const formatforecastweather = (data)=>{
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1,6).mad((d)=>{
        return {
            title:formatToLocalTime(d.dt, timezone, "ccc"),
            temp : d.temp.day,
            icon : d.weather[0].icon,
        };
    });
    hourly = hourly.slice(1,6).map((d)=>{
        return {
            title:formatToLocalTime(d.dt,timezone,"hh:mm a"),
            //temp is an object having day,min,max,night,evening,morning for now i am using day
            temp : d.temp,
            icon : d.weather[0].icon,
        };
    });
    return {timezone,daily,hourly};
};
const getFormattedweatherdata = async (searchParams)=>{
    const formattedcurrentweather = await getweatherdata("weather"
    ,searchParams).then(formatcurrentweather);
    
    const {lat, lon} = formattedcurrentweather;
    const formattedforecastweather = await getFormattedweatherdata("onecall",{
        lat,
        lon,
        exclude:"current, minutely, alerts",
        units: searchParams.units,
    }).then(formatforecastweather);
    return {...formattedcurrentweather, ...formattedforecastweather};
};
const formatToLocalTime = (
    secs,
    zone,
    // even if we dont format there is default format cccc = day , sunday, monday 
    //  dd = number date
    // LLL = month 
    // yyyy = year
    format = "cccc, dd LLL yyyy' | Local time :'hh:mm a"
)=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
// here from the api if we can see that data in dt : timestamp in sec 

const iconurlfromcode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedweatherdata;
export {formatToLocalTime, iconurlfromcode};
