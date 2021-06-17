import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./Header.css";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

function Header({ user }) {
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="navbar">
      <header className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt="Amazon Logo"
          />
        </Link>
        <div className="header__option header__optionDeliver">
          <LocationOnIcon className="header__locationIcon" />
          <div className="header__optionDeliverText">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">Vietnam</span>
          </div>
        </div>
        <div className="header__search">
          <input className="header__searchInput" type="text"></input>
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
          <div className="header__option header__optionLanguage">
            <img
              className="header__languageImage"
              src="https://tiengkeng.com/wp-content/uploads/2019/01/2000px-Flag_of_Vietnam.svg_.png"
              alt="VietNam Location"
            />
            <ArrowDropDownIcon className="header__languageDropdownIcon" />
          </div>
          <Link to={!user && "/signin"}>
            <div className="header__option" onClick={handleAuthentication}>
              <span className="header__optionLineOne">
                HellO {user?.email || 'Guest'}, {user ? `Sign Out` : `Sign In`}
              </span>
              <span className="header__optionLineTwo">Account & Lists</span>
            </div>
          </Link>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </div>

        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">0</span>
        </div>
      </header>
      <nav>
        <div className="nav__left">
          <DehazeIcon className="nav__leftIcon" />
          <span className="nav__leftMenu">All</span>
        </div>
        <div className="nav__fill">
          <ul>
            <li>
              <a href="#">Today's Deals</a>
            </li>
            <li>
              <a href="#">Customer Service</a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
            <li>
              <a href="#">Registry</a>
            </li>
            <li>
              <a href="#">Sell</a>
            </li>
          </ul>
        </div>
        <div className="nav__right">
          <span className="nav__rightText">Amazon's response to COVID-19</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
