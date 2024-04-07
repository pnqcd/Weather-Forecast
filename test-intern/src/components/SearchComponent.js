import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(city);
    };

    const handleCurrentLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                let location = `${latitude},${longitude}`;
                e.preventDefault();
                onSearch(location);
            }, (error) => {
                console.error('Error getting current location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="mt-3 mb-3 ms-4 me-4">
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <label htmlFor="" className="form-label p-0 fw-bold">Enter a City Name</label>
                    <input
                        type="text"
                        value={city}
                        name=""
                        id=""
                        className="form-control input-city"
                        placeholder="E.g., New York, London, Tokyo"
                        onChange={(e) => setCity(e.target.value)}
                        aria-describedby="helpId"
                    />
                    <a
                        name=""
                        id=""
                        className="btn bg-color w-100 mt-3 text-white btn-search"
                        role="button"
                        onClick={handleSearch}
                    >
                    Search
                    </a>
                </div>
            </div>
            <div className="row justify-content-center align-items-center mt-1">
                <div className="col-5 pe-0">
                    <hr className="" />
                </div>
                <div className="col-2 text-center p-0">or</div>
                <div className="col-5 ps-0">
                    <hr className="" />
                </div>
            </div>
            <div className="row justify-content-center align-items-center mt-1">
                <div className="col">
                    <a
                        name=""
                        id=""
                        className="btn bg-secondary w-100 text-white btn-search"
                        role="button"
                        onClick={handleCurrentLocation}
                    >
                        Use current location
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;
