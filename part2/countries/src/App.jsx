import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')
	const [weather, setWeather] = useState(null)
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY


	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	const handleShow = (country) => {
		setSearch(country.name.common)
	}


	useEffect(() => {
		axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const filteredCountries = countries.filter(country =>
		country.name.common.toLowerCase().includes(search.toLowerCase()))


	const selectedCountry =
		filteredCountries.length === 1 ? filteredCountries[0] : null


	useEffect(() => {
		if (selectedCountry) {
			setWeather(null)

			const capital = selectedCountry.capital[0]

			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
				)
				.then(response => {
					setWeather(response.data)
				})
		}
	}, [selectedCountry, apiKey])

	return (
		<div>
			Find Countries{' '}
			<input
				value={search}
				onChange={handleSearch}>
			</input>

			{search !== '' && filteredCountries.length > 10 && (
				<p>Too many matches, specify another filter</p>
			)}

			{filteredCountries.length >= 2 &&
				filteredCountries.length <= 10 &&
				filteredCountries.map(country => (
					<p key={country.cca3}>
						{country.name.common}
						{' '}
						<button onClick={() => handleShow(country)}>Show</button>
					</p>
				))
			}

			{filteredCountries.length === 1 && (
				<div>
					<h1>{filteredCountries[0].name.common}</h1>

					<div>Capital {filteredCountries[0].capital[0]}</div>

					<div>Area {filteredCountries[0].area}</div>

					<h2>Languages</h2>

					<ul>
						{Object.values(filteredCountries[0].languages).map(language => (
							<li key={language}>{language}</li>
						))}
					</ul>

					<img
						src={filteredCountries[0].flags.png}
						alt={`Flag of ${filteredCountries[0].name.common}`} />

					{weather && (
						<div>
							<h2>Weather in {filteredCountries[0].capital[0]}</h2>
							<p>Temperature {weather.main.temp} Celsius</p>
							<img
								src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
								alt={weather.weather[0].description}/>	
							<p>Wind {weather.wind.speed} m/s</p>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default App
