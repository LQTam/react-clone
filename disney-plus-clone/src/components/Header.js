import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  selectUserPhoto,
  selectUserName,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { HOME, LOGIN } from "../app/routes";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let { displayName, email, photoURL } = result.user;
      dispatch(
        setUserLogin({ name: displayName, email: email, photo: photoURL })
      );
      history.push(HOME);
    });
  };
  const Logout = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push(LOGIN);
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL } = user;
        dispatch(
          setUserLogin({ name: displayName, email: email, photo: photoURL })
        );
        history.push(HOME);
      } else {
        history.push(LOGIN);
      }
    });
  }, []);
  return (
    <Nav>
      <Link to={HOME}>
        <Logo src="/images/logo.svg" />
      </Link>
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href="#">
              <img src="/images/home-icon.svg" alt="home icon" />
              <span>HOME</span>
            </a>
            <a href="#">
              <img src="/images/search-icon.svg" alt="search icon" />
              <span>SEARCH</span>
            </a>
            <a href="#">
              <img src="/images/watchlist-icon.svg" alt="watchlist icon" />
              <span>WATCHLIST</span>
            </a>
            <a href="#">
              <img src="/images/original-icon.svg" alt="original-icon" />
              <span>ORIGINALS</span>
            </a>
            <a href="#">
              <img src="/images/movie-icon.svg" alt="movie-icon" />
              <span>MOVIES</span>
            </a>
            <a href="#">
              <img src="/images/series-icon.svg" alt="movie-icon" />
              <span>Series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={Logout}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}
export default Header;

const Nav = styled.div`
  background: #090b13;
  padding: 0 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    height: 70px;
    align-items: center;
    flex-direction: row;
    display: flex;
  }
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  @media (max-width: 767px) {
    display: block;
    width: 100%;
    flex: auto;
    text-align: center;
    order: 3;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background-color: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  height: 42px;
  border-radius: 50%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
