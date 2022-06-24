import { useState,useEffect } from "react"
import axios from "axios"

const App = ()=>{
  const [countryName, setCountryName] = useState('');

  const [countries,setCountries] = useState([])

  const [viewCountry,setviewCountry] = useState([])
  const [viewWeather, setViewWeather] = useState([])

  const API_KEY = process.env.REACT_APP_API_KEY;

  function handleCountry(e) {
    setCountryName(e.target.value)
  }

  useEffect(()=>{
    axios.get('https://restcountries.com/v2/all')
    .then(response=>{
      setCountries(response.data)
    })
  },[countryName])

  useEffect(()=>{
    
  },[viewCountry])

  useEffect(()=>{
    if(viewCountry.length !== 0){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${viewCountry[0]?.capital}&appid=${API_KEY}`)
    .then(response=>{
      setViewWeather([
        response.data.main,
        response.data.weather,
        response.data.wind,
      ])
    })
    }
  },[API_KEY, countryName, viewCountry])
  function showCountry(info){
    setviewCountry([info])
  }

  function filterCountries(filter){

    const countryFilter = countries.filter(country=> new RegExp(filter,'i').exec(country.name))
    if(countryFilter.length === 0 && filter ){
      return (
        <>
        <p>no results found for {filter}</p>
        </>
      )
    }else if(countryFilter.length > 10 && filter){
      return(
        <p>{`${filter} has too many matches, specify another filter`}</p>
      )
    }else if ((countryFilter.length <= 10 && countryFilter.length > 1) && filter){
      return (
        <>
        {
          countryFilter.map((country,index)=>
          <p key={index}>{country.name}
          <button onClick={()=>showCountry(country)}>show</button>
          </p>)

        }
        </>
      )      
    } else if (countryFilter.length === 1 && filter){
      return(
        <>
        <h1>{countryFilter[0].name}</h1>
        <p>capital - {countryFilter[0].capital}</p>
        <p>Region - {countryFilter[0].region}</p>
        <p>Area - {countryFilter[0].area}</p>
        <img src={countryFilter[0].flag} alt={countryFilter[0].name + 'flag'} width='200px' height='200px' />
        <h4>languages</h4>
        <ul>
        {countryFilter[0].languages.map((lang,i)=><li key={i}>{lang.name}</li >)}
        </ul>
        {
          viewCountry.length === 0? <></> :
          <>
          <h5>weather in {viewCountry[0].capital}</h5>
              <p>temperature {viewWeather[0]?.temp}</p>
              <img src={`https://openweathermap.org/img/w/${viewWeather[1][0].icon}.png`} alt={viewWeather[1][0].main + ' icon'} />
              <p> text {viewCountry[1][0].icon}</p>
              <p>wind {viewWeather[2]?.speed}</p>
          </>
        }
        </>
      )
    }
  }

  return(
    <div>
      find countries : <input value={countryName} onChange={handleCountry}/>
      <div>
        {viewCountry?.[0]?.name.includes(countryName)? 
          <>
          <h1>{viewCountry[0].name}</h1>
          <p>capital {viewCountry[0].capital}</p>
          <p>Region {viewCountry[0].region}</p>
          <p>Area {viewCountry[0].area}</p>
          <img src={viewCountry[0].flag} alt={viewCountry[0].name + 'flag'} width='200px' height='300px' />
          <ul>
          {viewCountry[0].languages.map((lang,i)=><li key={i}>{lang.name}</li >)}
          </ul>
          {
            viewWeather.length === 0 ? <> </>:
            <>
              <h5>weather in {viewCountry[0].capital}</h5>
              <p>temperature {viewWeather[0]?.temp}</p>
              <img src={`https://openweathermap.org/img/w/${viewWeather[1][0].icon}.png`} width='100px' height='150px' alt={viewWeather[1][0].main + ' icon'} />
              <p>wind {viewWeather[2]?.speed}</p>
            </>
          }
          </>
         : filterCountries(countryName)}
      </div>
    </div>
  )
}

export default App