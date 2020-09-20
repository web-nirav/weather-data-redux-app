import React, { useState } from "react";
// import axios from "axios";
import getWeatherData from "./weather.json";
import { connect } from "react-redux";
import { setWeatherData } from "./redux/weather/weather.actions";
import { Modal, Button } from "react-bootstrap";

function App({ weatherData, setWeatherData }) {
  const [show, setShow] = useState(false);
  const [weatherRowData, setWeatherRowData] = useState(null);
  const fetchWeatherData = () => {
    // console.log(getWeatherData);
    setWeatherData(getWeatherData);
    /* axios(
      "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=439d4b804bc8187953eb36d2a8c26a02"
    )
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((error) => {
        setError(error);
      }); */
  };

  const handleClick = () => {
    fetchWeatherData();
  };

  const handleRowClick = (index) => {
    setWeatherRowData(weatherData.list[index]);
    setShow(true);
    console.log(weatherData.list[index]);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container">
      <h2>
        Weather data list for the city: {weatherData && weatherData.city.name}
      </h2>
      
      <p>Current Weather data: Hourly Forecast</p>

      <button className="btn btn-primary mb-4" onClick={handleClick}>
      Current Weather data
      </button>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Description</th>
            <th>Humidity</th>
            <th>Ground level</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {weatherData &&
            weatherData.list.map((row, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td>{row.weather[0].description}</td>
                <td>{row.main.humidity}</td>
                <td>{row.main.grnd_level}</td>
                <td>{row.main.temp}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Weather Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {weatherRowData && (
            <ul>
              <li>Description: {weatherRowData.weather[0].description}</li>
              <li>Humidity: {weatherRowData.main.humidity}</li>
              <li>Ground level: {weatherRowData.main.grnd_level}</li>
              <li>Temperature: {weatherRowData.main.temp}</li>
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  weatherData: state.weather.weatherData,
});

const mapDispatchToProps = (dispatch) => ({
  setWeatherData: (weather) => dispatch(setWeatherData(weather)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
