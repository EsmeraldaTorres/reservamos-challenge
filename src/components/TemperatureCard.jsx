import { useEffect, useState } from "react";
import "../styles/TemperatureCard.css";

const TemperatureCard = ({ maxMinTempByDay, cityInfo }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  const changeTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <>
      <section className="info-cards-container">
        <div className=" text-center city-name-container">
          <span className="city-name">{cityInfo?.city_name},</span>
          <span>{cityInfo?.country}</span>
        </div>
        <div className="title-temperature">
          Temperatura en los próximos 5 días
        </div>
        <div className="card-box">
          {maxMinTempByDay.map((day, key) => (
            <div key={key} className="card-content">
              <p className="date">{formatDate(day.date)} </p>
              <p>
                <span className="label-card">Max:{""}</span>
                <span className="value-temperature">
                  {" "}
                  {isCelsius
                    ? `${(day.temp_max - 273.15).toFixed(1)} °C`
                    : `${day.temp_max} °F`}
                </span>
              </p>
              <p>
                <span className="label-card">Min:{""}</span>
                <span className="value-temperature">
                  {" "}
                  {isCelsius
                    ? `${(day.temp_min - 273.15).toFixed(1)}°C`
                    : `${day.temp_min} °F`}
                </span>
              </p>
            </div>
          ))}
        </div>
        <button className="weather-btn" onClick={changeTemperature}>
          Cambiar a F°/C°
        </button>
      </section>
    </>
  );
};
export default TemperatureCard;
