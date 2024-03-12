import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import InputSearch from "./components/InputSearch";
import TemperatureCard from "./components/TemperatureCard";
import Loader from "./components/Loader";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [cityName, setCityName] = useState("");
  const [reservamosDestinations, setReservamosDestinations] = useState([]);
  const [maxMinTempByDay, setMaxMinTempByDay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorWeatherApi, setErrorWeatherApi] = useState(false);
  const [cityInfo, setCityInfo] = useState({});

  const handleGetReservamosDestinations = () => {
    const urlReservamosPlaces = `https://search.reservamos.mx/api/v2/places?q=${cityName}`;
    axios
      .get(urlReservamosPlaces)
      .then(function (response) {
        const responseReservamosApi = response.data;

        const noRepeatPlacesReservamosApi = responseReservamosApi.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.city_name === item.city_name)
        );
        if (noRepeatPlacesReservamosApi.length != 0) {
          setReservamosDestinations(noRepeatPlacesReservamosApi);
        } else {
          setReservamosDestinations([{ city_name: "No hay resultados" }]);
        }
      })
      .catch(function (error) {
        console.log(error);
        setReservamosDestinations([
          { city_name: "Por favor, intenta más tarde" },
        ]);
      })
      .finally(function () {});
  };

  const handleGetWeather = (e, city) => {
    e.preventDefault();
    setIsLoading(true);
    setCityInfo(city);
    if (city.lat && city.long) {
      const APIKEY = "0eebd1fcf852d29ca0340c5c451d4c9a";
      const urlOpenWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.long}&appid=${APIKEY}`;
      axios
        .get(urlOpenWeatherApi)
        .then(function (response) {
          handleSplitListIntoDays(response.data.list);
          setErrorWeatherApi(false);
        })
        .catch(function (error) {
          console.log(error);
          setErrorWeatherApi(true);
        })
        .finally(function () {
          setIsLoading(false);
        });
    } else {
      setErrorWeatherApi(true);
    }
  };

  const todayNumber = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    return day;
  };

  const handleSplitListIntoDays = (list) => {
    const today = new Date();
    const formattedDate = todayNumber(today);

    const listFormat = list.map((obj) => {
      const fecha = new Date(obj.dt_txt);
      const dia = fecha.getDate();
      const dateAndDay = {
        day: dia,
        date: obj.dt_txt,
        temp_max: obj.main.temp_max,
        temp_min: obj.main.temp_min,
      };
      return dateAndDay;
    });

    const listWithoutToday = listFormat.filter((date) => {
      return date.day != formattedDate;
    });

    const getDays = (listWithoutToday) => {
      const listWithoutTodayNoRepeat = [
        ...new Set(listWithoutToday.map((e) => e.day)),
      ];

      const arrResult = [];
      for (let i = 0; i < listWithoutTodayNoRepeat.length; i++) {
        const day = listWithoutToday.filter(
          (e) => e.day === listWithoutTodayNoRepeat[i]
        );
        arrResult.push(day);
      }
      return arrResult;
    };

    const listByDays = getDays(listWithoutToday);

    const temperaturesByDay = listByDays.map((days) => {
      const temperatures = days.map((day) => ({
        date: day.date,
        temp_max: day.temp_max,
        temp_min: day.temp_min,
      }));
      const maxTemperature = Math.max(
        ...temperatures.map((day) => parseFloat(day.temp_max))
      );
      const minTemperature = Math.min(
        ...temperatures.map((day) => parseFloat(day.temp_min))
      );
      const dates = days[0].date;

      return {
        temp_max: maxTemperature,
        temp_min: minTemperature,
        date: dates,
      };
    });

    if (temperaturesByDay.length > 5) {
      const fiveDays = temperaturesByDay.slice(0, temperaturesByDay.length - 1);
      setMaxMinTempByDay(fiveDays);
    } else {
      setMaxMinTempByDay(temperaturesByDay);
    }
  };

  useEffect(() => {
    if (cityName.length >= 1) {
      handleGetReservamosDestinations(cityName);
    } else {
      setReservamosDestinations([]);
    }
  }, [cityName]);

  return (
    <>
      <Header />
      <h2 className="home-title">Prepárate para tu viaje y revisa el clima</h2>
      <div className="w-100 d-flex justify-content-center align-items-center flex-column">
        <InputSearch
          setCityName={setCityName}
          reservamosDestinations={reservamosDestinations}
          cityName={cityName}
          handleGetWeather={handleGetWeather}
        />
      </div>
      {isLoading ? (
        <div className="w-100 d-flex text-center justify-content-center mt-4">
          <Loader cityName={cityName} />
        </div>
      ) : errorWeatherApi ? (
        <>
          <ErrorMessage />
        </>
      ) : (
        maxMinTempByDay.length >= 5 &&
        errorWeatherApi === false && (
          <TemperatureCard
            cityInfo={cityInfo}
            maxMinTempByDay={maxMinTempByDay}
          />
        )
      )}
    </>
  );
}

export default App;
