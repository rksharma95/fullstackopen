import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CountryList = (props) => {

    const [toShow, setToShow] = useState()

    const handleShow = (e) => {
        let country = e.target.getAttribute('data').toLowerCase()
        country = props.countries.filter(c => c.name.toLowerCase() === country)
        setToShow(country)
        
    }

    return(
        <div>
            {props.countries.map(country => {
                return(<div key={country.name}>
                <p>{country.name}
                 <button type="button" data={country.name} onClick={handleShow}>show</button></p>
                </div>)
            })}
            {(toShow)?<CountryInfo country={toShow}/>:null}
        </div>
    )
}

const Weather = ({capital}) => {

    const [weatherInfo, setWeatherInfo] = useState({})
    console.log(process.env.REACT_APP_API_KEY)
    const access_key = "4d88cd0edd53e0ae59eb5ce316bfe502"
    useEffect(()=>{
        axios
            .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`)
            .then(response => {
                console.log(response.data)
                const {temperature,weather_icons,wind_speed,wind_dir} = response.data.current
                setWeatherInfo({
                    temperature,
                    weather_icons,
                    wind_dir,
                    wind_speed
                })
            })
    },[])
    return(
        <div>
            <h3>Weather in {capital}</h3>
            <p><b>temperature: </b> {weatherInfo.temperature}</p>
            <img src={weatherInfo.weather_icons} height="100px" width="100px" alt="wind_icon"/>
            <p><b>wind: </b> {weatherInfo.wind_speed} direction {weatherInfo.wind_dir} </p>
        </div>
    )
}

const CountryInfo = (props) => {
    const country = props.country[0]      
    return(
        <div>
            <div>
                <h2>{country.name}</h2>
                <div>
                    <p>capital {country.capital}</p>
                    <p>population {country.population}</p>
                </div>
                <div>
                    <h3>languages</h3>
                    {(country.languages)?country.languages.map(lang => <p key={lang}>{lang}</p>):''}
                </div>
                <div>
                    <img src={country.flag} height="100px" width="100px" alt="flag" />
                </div>
            </div>
            <div>
                <Weather capital={country.capital} />
            </div>
        </div>
    )        
}

const App = () => {
    const [findKey, setFindKey] = useState('')
    const [countries, setCountries] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const handleFindChange = (e) => {
        setFindKey(e.target.value)
    }

    useEffect(() => {
        setSearchResult(
            countries.filter(country => country.name.toLowerCase().includes(findKey.toLowerCase()))
        )
    },[findKey])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const countriens_names = response.data.map(({name, capital, population, languages, flag}) => {
                    const lang = (languages)?languages.map(({name}) => name):''
                    return{name, capital, population, lang, flag}})
                console.log(countriens_names)
                setCountries(countriens_names)
            })
    },[])
    return(
        <div>
            find countries
            <input value={findKey} onChange={handleFindChange}/>
            <div>
                {searchResult.length === 1 ? 
                 <CountryInfo country={searchResult}/>
                :searchResult.length > 0 ? 
                 searchResult.length < 11 ? <CountryList countries={searchResult} />
                : <p>Too many matches, specify another filter</p> : null}
            </div>
        </div>
    )
}

export default App;