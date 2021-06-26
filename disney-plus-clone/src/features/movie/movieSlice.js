import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommends: null,
  newDisneys: null,
  originals: null,
  trendings: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommends= action.payload.recommends
      state.newDisneys = action.payload.newDisneys;
      state.originals = action.payload.originals;
      state.trendings = action.payload.trendings;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommends= (state) => state.movie.recommends
export const selectNewDisneys = (state) => state.movie.newDisneys;
export const selectOriginals = (state) => state.movie.originals;
export const selectTrendings = (state) => state.movie.trendings;

export default movieSlice.reducer;
