import { createSlice } from "@reduxjs/toolkit";
import { User } from "@util/types";

const initialState: User = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.token = payload.token;
      state.id = payload.id;
      state.name = payload.name;
      state.username = payload.username;
      state.email = payload.email;
      state.birthdate = payload.birthdate;
      if (payload.image) state.image = payload.image;
      if (payload.sex) state.sex = payload.sex;
      if (payload.address) state.address = payload.address;
      if (payload.phone) state.phone = payload.phone;
      if (payload.occupation) state.occupation = payload.occupation;
    },
  },
});

export const actions = { ...userSlice.actions };
export const reducer = userSlice.reducer;
