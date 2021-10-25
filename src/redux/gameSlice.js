import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    value: 20,
    valueMulti: 1,
    storesToBuyIndex: 0,
  },
  reducers: {
    addToValue: (state, action) => {
      // console.log(`store thinks its adding: ${action.payload}`)
      state.value += action.payload;
    },
    subFromValue: (state, action) => {
      state.value -= action.payload;
    },
    increaseMulti: (state) => {
      state.valueMulti++;
    },
    changeIndex: (state) => {
      if(state.storesToBuyIndex >= 3) {
        state.storesToBuyIndex = 0;
      } else {
        state.storesToBuyIndex++;
      }
    }
  },
});

// ACTIONS export
export const { addToValue, subFromValue, increaseMulti, changeIndex } = gameSlice.actions;

// Define a thunk that dispatches those action creators
/**
 * function to add a dynamic value to game asynchronously.
 * @param {Number} step (OPTIONAL: default value 1)
 */
export const addThunk = (step = 1) => async dispatch => {
  setTimeout(() => {
    console.log("aa:: addAsync called...");
    dispatch(addStep(step));
  }, 1000);
}

export default gameSlice.reducer;