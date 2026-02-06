import { createSlice } from "@reduxjs/toolkit"

/*
  STEP 1: Load wish items from localStorage
  - Reads saved wish data on page refresh
*/

const loadwishFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wish");
    return data
      ? JSON.parse(data)
      : {
          count: 0,
          items: [],
        };
  } catch (error) {
    console.error("Error loading wish from localStorage", error);
    return {
      count: 0,
      items: [],
    };
  }
};
/*
  STEP 2: Save wish items to localStorage
*/

const savewishToLocalStorage = (state) => {
  try {
    localStorage.setItem("wish", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving wish to localStorage", error);
  }
};

  // Initial state (restored from localStorage)
  const initialState = loadwishFromLocalStorage();

/*
  STEP 3: Create wish List
*/

const wishList = createSlice({
  name: "wish",
  initialState,

 
  reducers: {
    /*
      ADD TO wish
      - action.payload → full product object from mockProducts
      - Uses _id to avoid duplicates
    */
    addTowish: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      state.count += 1;
      savewishToLocalStorage(state);
    },

    /*
      REMOVE FROM wish (entire product)
    */
        removeFromwish: (state, action) => {
            const productId = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === productId
            );

            if (existingItem) {
                state.count -= existingItem.quantity;
                state.items = state.items.filter(
                (item) => item._id !== productId
                );
            }

            if (state.count < 0) state.count = 0;
            savewishToLocalStorage(state);
            },


      /*
      INCREASE QUANTITY (+ button)
    */
       increaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item._id === productId
      );

      if (item) {
        item.quantity += 1;
        state.count += 1;
        savewishToLocalStorage(state);
      }
    },

      /*
      DECREASE QUANTITY (- button)
    */
    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item._id === productId
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        state.count -= 1;
      } else {
        // remove item if quantity becomes 0
        state.items = state.items.filter(
          (i) => i._id !== productId
        );
        state.count -= 1;
      }

      if (state.count < 0) state.count = 0;
      savewishToLocalStorage(state);
    },



     /*
      CLEAR wish
    */
    clearwish: (state) => {
      state.count = 0;
      state.items = [];
      savewishToLocalStorage(state);
    },
  },
})

/*
  STEP 4: Export Actions & Reducer
*/
export const {
  addTowish,
  removeFromwish,
  increaseQuantity,
  decreaseQuantity,
  clearwish,
} = wishList.actions;

export default wishList.reducer;