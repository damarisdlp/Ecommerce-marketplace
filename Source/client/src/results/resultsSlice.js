import { createSlice } from '@reduxjs/toolkit';

// set up initial state with default values
const initialState = {
  data: {},
  numResults: 12,
  pageNum: 1,
  listView: 'grid',
  category: 'Results',
};

// Create a slice for handling the results returned from the data source
export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  // the setter functions
  reducers: {
    // setter function for number of results per page
    setNumResults: (state, action) => {
      state.numResults = action.payload;
    },
    // setter function for number of the desired page
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    // setter function for List/Grid veiw: use 'grid' or 'list'
    setListView: (state, action) => {
      state.listView = action.payload;
    },
    // setter function for setting the results category type accepts any string
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    // setter function for setting the results data - an array of Json objects
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = action.loading;
      if (action.callback) {
        action.callback();
      }
    },
  },
});

export const { setNumResults, setPageNum, setListView, setCategory, setData } = resultsSlice.actions;

export const numResults = (state) => state.results.numResults;
export const pageNum = (state) => state.results.pageNum;
export const listView = (state) => state.results.listView;
export const category = (state) => state.results.category;
export const data = (state) => state.results.data;

const resultsReducer = resultsSlice.reducer;

export default resultsReducer;
