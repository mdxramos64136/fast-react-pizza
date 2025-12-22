import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

////////////////////////////////
//using Redux-Toolkit way to create a Thunks function.
//creatAsyncThuns receives 2 parameters: name of the action type  and async function that
//will return the payload for the reducer later. This function needs to return
// a promisse. This function will be executed as soon as the action user/fetchAddres
// get dispatched
// This fetchAddress will become a action creator Function
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address,
    // so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //this data will become the PAYLOAD of the fulfilleD state
    return { position, address };
  },
);
////////////////////////////////
//State of slice with Redu toolkit
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

/// Parameters: name of the slice, var with the inicial state values, and obj with reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

console.log(userSlice);

export const { updateName } = userSlice.actions;
export default userSlice.reducer; /// will be used to setup  the store
