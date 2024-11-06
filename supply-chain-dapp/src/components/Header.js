import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/manufacturer">Manufacturer</Link>
          </li>
          <li>
            <Link to="/wholesaler">Wholesaler</Link>
          </li>
          <li>
            <Link to="/distributor">Distributor</Link>
          </li>
          <li>
            <Link to="/pharmacy">Pharmacy</Link>
          </li>
          <li>
            <Link to="/consumer">Consumer</Link>
          </li> */}
        </ul>
      </nav>
      <WalletConnect />
    </header>
  );
};

export default Header;
