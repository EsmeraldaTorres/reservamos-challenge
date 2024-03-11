import { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/InputSearch.css";

function InputSearch({
  setCityName,
  reservamosDestinations,
  cityName,
  handleGetWeather,
  loadingPlaces,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef(null);

  //  si no hay lat y long, esa funcion no se debe consumir.
  useEffect(() => {
    if (reservamosDestinations.length >= 1) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [reservamosDestinations]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        selectRef.current.selectedIndex = -1;
        setShowOptions(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <>
      <div className="input-container">
        <div className="relative mt-2 rounded-md d-flex align-items-center mr-4 ml-4 mb-0">
          <div className="input-search-icon"></div>
          <input
            className="input-search destination"
            type="text"
            autoComplete="off"
            value={cityName.city_name}
            name="city-name"
            id="city"
            onChange={(event) => {
              setCityName(event.target.value);
            }}
            onKeyPress={(event) => {
              if (!/[A-ZÑa-zñ\s]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Nombre de la ciudad"
          />
        </div>
        {showOptions && (
          <ul
            className="options-box"
            role="listbox"
            ref={selectRef}
            id="headlessui-combobox-options-30"
            data-headlessui-state="open"
            aria-labelledby="headlessui-combobox-label-1"
          >
            {reservamosDestinations.map((city, key) => (
              <>
                <li
                  className="options"
                  id={city.id + `-${key}`}
                  role="option"
                  onClick={(event) => {
                    setCityName(city);
                    handleGetWeather(event, city);
                  }}
                  aria-selected="false"
                  data-headlessui-state=""
                >
                  <span className="lu adl">{city.city_name}</span>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default InputSearch;
