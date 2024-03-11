import reservamosLogo from "../assets/images/reservamos-logo.png";
import "../styles/Header.styles.css";

const Header = () => {
  return (
    <>
      <header className="h-16 bg-white flex justify-between items-center">
        <div className="header-container">
          <div className="header-content">
            <img src={reservamosLogo} alt="logo" className="header-logo" />
            <div className="header-menu"></div>
            <p className="header-tag">
              ¡El sitio #1 para encontrar tu boleto de autobús al mejor precio!
            </p>
          </div>
          <div className="icon-button">
            <span className="title">Esmeralda</span>
            <img
              src="https://assets-fl.reservamos.mx/assets/components/account-dropdown/account-icon-0930c9900955ffd86a8c6094b8da27d4731d4a45fb401f5ee20b26dcc607c90c.svg"
              alt=""
              data-account-image=""
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
