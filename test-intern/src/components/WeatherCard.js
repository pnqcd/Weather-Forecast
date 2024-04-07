import React, {useState} from 'react';
import axios from 'axios';

const WeatherCard = ({ weather }) => {
    const {location, current, forecast} = weather;
    const [additionalForecast, setAdditionalForecast] = useState([]);
    const [loadMoreClicked, setLoadMoreClicked] = useState(false);
    const [email, setEmail] = useState('');

    const renderForecast = () => {
        return forecast.forecastday.slice(1, 5).map(day => (
            <div className="col-lg-3 col-md-6 col-6 mt-3 mb-3 d-flex">
                <div key={day.date} className="weather-card next-forecast bg-secondary lh-lg">
                    <p className="fs-6 fw-bold">({day.date})</p>
                    <img src={`https:${day.day.condition.icon}`} alt="Weather icon" className="next-forecast-icon"/>
                    <p className="fs-6">Temperature: {day.day.avgtemp_c}°C</p>
                    <p className="fs-6">Wind: {day.day.maxwind_mph} M/H</p>
                    <p className="fs-6">Humidity: {day.day.avghumidity}%</p>
                </div>
            </div>
        ));
    };

    const renderAdditionalForecast = () => {
        return additionalForecast.map(day => {
            <div className="col-lg-3 col-md-6 col-6 mt-3 mb-3 d-flex">
                <div key={day.date} className="weather-card next-forecast bg-secondary lh-lg">
                    <p className="fs-6 fw-bold">({day.date})</p>
                    <img src={`https:${day.day.condition.icon}`} alt="Weather icon" className="next-forecast-icon"/>
                    <p className="fs-6">Temperature: {day.day.avgtemp_c}°C</p>
                    <p className="fs-6">Wind: {day.day.maxwind_mph} M/H</p>
                    <p className="fs-6">Humidity: {day.day.avghumidity}%</p>
                </div>
            </div>
        });
    };

    const loadMoreForecast = () => {
        setLoadMoreClicked(true);
        const additionalDays = forecast.forecastday.slice(5);
        setAdditionalForecast(additionalDays);
    }

    const handleSubscribe = async () => {
        console.log(email);
        try {
            const response = await axios.post('/subscribe', { email });
                console.log(response.data);
            } catch (error) {
                console.log(error);
                console.error('Error subscribing:', error);
            }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const getLocalDate = () => {
        const dateParts = location.localtime.split(' ');
        return dateParts[0];
    };

    return (
        <div className="mt-3 mb-3 ms-4 me-4">
            <div className="weather-card bg-color">
                <div className="row justify-content-center align-items-center">
                    <div className="col-9 lh-lg">
                        <p className="fs-4 fw-bold">{location.name} ({getLocalDate()})</p>
                        <p>Temperature: {current.temp_c}°C</p>
                        <p>Wind: {current.wind_mph} M/H</p>
                        <p>Humidity: {current.humidity}%</p>
                    </div>

                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <img src={`https:${current.condition.icon}`} alt="Weather icon"/>
                        <p className="fs-6 text-center">{current.condition.text}</p> 
                    </div>
                </div>
            </div>

            <div className="mt-3 d-inline-flex flex-row align-items-center">
                <p className="fs-4 fw-bold ">4-Day Forecast</p>
                {/* <a className="ms-3" onClick={loadMoreForecast} role="button">
                    Load more
                </a> */}

            </div>
        
            <div className="row justify-content-center">
                {renderForecast()}
                {loadMoreClicked && renderAdditionalForecast()}
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-6 mt-3">
                    {/* <a role="button" className="text-primary" onClick={handleSubscribe}>Receive information via mail</a> */}
                    <input className="form-control" type="email" placeholder="Enter email to receive information" value={email} onChange={handleEmailChange} />
                </div>
                <div className="col-12 col-sm-6 mt-3 text-center text-sm-start">
                    <button className="btn bg-color text-white" onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard