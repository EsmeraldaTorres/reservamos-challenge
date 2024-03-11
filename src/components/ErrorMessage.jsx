import "../styles/TemperatureCard.css";
const ErrorMessage = () => {
  return (
    <>
      <div className="no-info-message-box">
        <p className="no-info-message-txt">
          Por el momento no hay información del clima de esta ciudad. Por favor,
          intenta haciendo una nueva búsqueda.
        </p>
        <div className="no-info-message-loader"></div>
      </div>
    </>
  );
};
export default ErrorMessage;
