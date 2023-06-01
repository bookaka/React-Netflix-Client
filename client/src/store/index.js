import {
    configureStore,
    createAsyncThunk,
    createSlice
  } from "@reduxjs/toolkit";
  
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL } from "../utils/Constants";
  
  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
  };
  
  export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  });
  
  const createArrayFromRawData = (array, genres) => {
    const moviesArray = [];
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path) {
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3)
        });
      }
    });
    return moviesArray;
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const response = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      const results = response.data.results;
      const movies = createArrayFromRawData(results, genres);
      moviesArray.push(...movies);
    }
    return moviesArray;
  };
  
 
  export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const { genres } = thunkAPI.getState().netflix;
      return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
      
    }
  );
  export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/user/liked/${email}`);
      return movies;
    }
  );
  export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);
  
  const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    reducers: {
      setGenres: (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      },
      setMovies: (state, action) => {
        state.movies = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
     
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    }
  });
  
  export const store = configureStore({
    reducer: {
      netflix: NetflixSlice.reducer
    }
  });
  
  export const { setGenres, setMovies } = NetflixSlice.actions;
  