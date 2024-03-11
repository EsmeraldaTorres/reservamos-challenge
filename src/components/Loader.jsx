import { useEffect, useState } from "react";
import "../styles/TemperatureCard.css";

const Loader = ({ cityName }) => {
  const [noCoordsInfo, setNoCoordsInfo] = useState(false);

  useEffect(() => {
    if (typeof cityName === "object") {
      if (cityName.lat === null || cityName.long === null) {
        setNoCoordsInfo(true);
      }
    }
  }, [cityName]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="loader"></div>
        {noCoordsInfo && (
          <div className="mt-4 text-pink">
            Parece que no hay información de esta ciudad. Intenta haciendo una
            nueva búsqueda
          </div>
        )}
      </div>
    </>
  );
};

export default Loader;
