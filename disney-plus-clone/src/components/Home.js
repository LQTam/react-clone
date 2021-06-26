import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";

function Home() {
  const dispatch = useDispatch();
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];
  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [
              ...recommends,
              {
                id: doc.id,
                ...doc.data(),
              },
            ];
            break;
          case "new":
            newDisneys = [
              ...newDisneys,
              {
                id: doc.id,
                ...doc.data(),
              },
            ];
            break;
          case "original":
            originals = [
              ...originals,
              {
                id: doc.id,
                ...doc.data(),
              },
            ];
            break;
          case "trending":
            trendings = [
              ...trendings,
              {
                id: doc.id,
                ...doc.data(),
              },
            ];
            break;
          default:
            break;
        }
      });
      dispatch(setMovies({ recommends, newDisneys, originals, trendings }));
    });
  }, []);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

export default Home;
const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
