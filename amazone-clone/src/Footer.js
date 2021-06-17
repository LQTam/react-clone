import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import LanguageIcon from "@material-ui/icons/Language";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
function Footer() {
  return (
    <div className="footer">
      <a href="#top" class="backToTopBtn">
        Back to top
      </a>
      <div className="footer__lineOne">
        <div className="footer__section">
          <div className="footer__sectionHead">
            <h3>Get to Know Us</h3>
            <div className="footer__sectionLinks">
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">About Amazon</a>
              <a href="#">Investor Relations</a>
              <a href="#">Amazon Devices</a>
            </div>
          </div>
        </div>

        <div className="footer__section">
          <div className="footer__sectionHead">
            <h3>Make Money with Us</h3>

            <div className="footer__sectionLinks">
              <a href="#">Sell products on Amazon</a>
              <a href="#">Sell on Amazon Business</a>
              <a href="#">Sell apps on Amazon</a>
              <a href="#">Become an Affiliate</a>
              <a href="#">Advertise Your Products</a>
              <a href="#">Self-Publish with Us</a>
              <a href="#">Host an Amazon Hub</a>
              <a href="#">
                <span className="footer__sectionLinkCarat">›</span>See More Make
                Money with Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer__section">
          <div className="footer__sectionHead">
            <h3>Amazon Payment Products</h3>
            <div className="footer__sectionLinks">
              <a href="#">Amazon Business Card</a>
              <a href="#">Shop with Points</a>
              <a href="#">Reload Your Balance</a>
              <a href="#">Amazon Currency Converter</a>
            </div>
          </div>
        </div>
        <div className="footer__section">
          <div className="footer__sectionHead">
            <h3>Let Us Help You</h3>
            <div className="footer__sectionLinks">
              <a href="#">Amazon and COVID-19</a>
              <a href="#">Your Account</a>
              <a href="#">Your Orders</a>
              <a href="#">Shipping Rates & Policies</a>
              <a href="#">Returns & Replacements</a>
              <a href="#">Manage Your Content and Devices</a>
              <a href="#">Amazon Assistant</a>
              <a href="#">Help</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__lineTwo">
        <Link to="/">
          <img
            className="footer__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt="Amazon Logo"
          />
        </Link>
        <div className="footer__locationDetails">
          <div className="footer__countryLanguage footer__locationDetail-item">
            <LanguageIcon className="languageIcon" />
            <span className="languageLabel">English</span>
            <KeyboardArrowDownIcon className="countryLocation__dropdownIcon" />
          </div>
          <div className="footer__countryCurrency footer__locationDetail-item">
            <div className="currency__symbol">$</div>
            <div className="currency__name">USD - US. Dollar</div>
          </div>

          <div className="footer__region footer__locationDetail-item">
            <img
              className="flag"
              src="https://tiengkeng.com/wp-content/uploads/2019/01/2000px-Flag_of_Vietnam.svg_.png"
              alt="VietNam Location"
            />
            <span className="name">Viet Nam</span>
          </div>
        </div>
      </div>
      <div className="footer__lineThree">
        <table>
          <tbody>
            <tr>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Amazon Music
                  <span>Stream millions of songs</span>
                </a>
              </td>

              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Amazon Advertising
                  <span>Find, attract, and engage customers</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Amazon Drive
                  <span>Cloud storage from Amazon</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  6pm
                  <span>Score deals on fashion brands</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  AbeBooks
                  <span>Books, art & collectibles</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  ACX
                  <span>Audiobook Publishing Made Easy</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Alexa
                  <span>Actionable Analytics for the Web</span>
                </a>
              </td>
            </tr>
            <tr>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Sell on Amazon
                  <span>Start a Selling Account</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
              <td className="footer__LineThreeItem">
                <a href="#">
                  Amazon Business
                  <span>Everything For Your Business</span>
                </a>
              </td>
              <td className="footer__lineThreeSpace"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer__lineFour">
        <a href="#" className="footer_lineFourLink">
          Conditions of Use
        </a>
        <a href="#" className="footer_lineFourLink">
          Privacy Notice
        </a>
        <a href="#" className="footer_lineFourLink">
          Interest-Based Ads
        </a>
        <a href="#" className="footer_lineFourLink">
          &copy; 2021, Amazon.com, Inc or its affiliates
        </a>
      </div>
    </div>
  );
}

export default Footer;
