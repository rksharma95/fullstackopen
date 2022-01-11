import { useState, useEffect } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)  

  useEffect(() => {
    if(name !== ''){
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`, {
      method:'GET'
    })
    .then(response => response.json())
    .then(response => {
      response = response[0]
      setCountry({data:{
      name: response.name.common,
      capital: response.capital[0],
      population: response.capital,
      flag: response.flags.png
    }, found:true})})
    .catch(() => setCountry({found:false}))}
  }, [name])

  return country
}