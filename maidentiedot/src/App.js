import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterBy, setFilterBy ] = useState('')
  
  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {

      setCountries(response.data)
    })
}, [])
  
  const countriesToShow = filterBy === ""
    ? countries
    : countries.filter(country => country.name.toUpperCase().includes(filterBy.toUpperCase()))
  
  const handleFilter = (event) => {
    
      setFilterBy(event.target.value)
    }

    const showCountries = () => {
      if (countriesToShow.length === 0){
        return
      } else if (countriesToShow.length > 10){
        return <p>Too many matches, specify another filter</p>
      } else if (countriesToShow.length > 1){
        return countriesToShow.map(country => <p key={country.cioc}>{country.name} <button onClick={()=>{setFilterBy(country.name)}}>Show</button></p>)
      } else {
        var country = countriesToShow[0];
        console.log(country.languages.map(language => <li key={language.name}>language.name</li>))
        return (<div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>Languages</h3>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          <br />
          <img src={country.flag} alt="flag" height="100"></img>
          </div>
        ) 
      }
      
    }


  return (
    <div>
      <h1>Find your favourite country</h1>
      <div>Find countries: <input value={filterBy} onChange={handleFilter} /></div>
      {showCountries()}
    </div>
  )

}

export default App
