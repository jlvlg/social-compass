import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "@util/server";
import { User } from "@util/types";
import { Thunk } from "..";

const initialState: User = {};

function saveUser(): Thunk {
  return (dispatch, getState) => {
    const user = getState().user;
    localStorage.setItem(
      "user",
      JSON.stringify({ id: user.id, token: user.token }),
    );
  };
}

function logout(): Thunk {
  return (dispatch, getState) => {
    localStorage.removeItem("user");
    dispatch(actions.setUser({}));
  };
}

const loadUser = createAsyncThunk(
  "user/loadUser",
  async (savedUser: any, thunkAPI) => {
    if (Object.keys(savedUser).length > 0) {
      const user = await server.getUserByID(
        savedUser.id,
        savedUser.token,
        thunkAPI.signal,
      );
      return { ...user, token: savedUser.token };
    }
  },
);

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
      if (payload.posts) state.posts = payload.posts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      if (payload) {
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
        if (payload.posts) state.posts = payload.posts;
      }
    });
  },
});

export const actions = { ...userSlice.actions, saveUser, loadUser, logout };
export const reducer = userSlice.reducer;
